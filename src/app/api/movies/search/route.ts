//this route will handle a search request, call the watchmode api, and return the results

import axios from "axios";
import { NextResponse, NextRequest } from "next/server";
// auth helpers
import { verifyServerAuth } from "../../helpers/authHelpers";
// types imports
import type { MoviesSearchResponse, MovieData, WatchmodeTitleResult, WatchmodeSearchResponse } from "@/app/types/shared/types";

// POST /api/movies/search
export async function POST(request: NextRequest) {
    try {
        const userTokenData = await verifyServerAuth();
        if (!userTokenData) {
            return NextResponse.json<MoviesSearchResponse>({
                message: "Cannot retrieve movie search results", movies: [], errors: ["User login invalid"]
            }, { status: 401 }
            );
        }

        const reqBody = await request.json();
        const { query } = reqBody;

        const apiKey = process.env.WATCHMODE_API_KEY; // Use server-side environment variable

        if (!apiKey) {
            return NextResponse.json<MoviesSearchResponse>({
                message: "Cannot retrieve movie search results", movies: [], errors: ["Watchmode API key missing"]
            }, { status: 403 }
            );
        }

        // Watchmode API base URL
        const BASE_URL = "https://api.watchmode.com/v1";

        // Call the watchmode api to search for the movie
        const searchRes = await axios.get<WatchmodeSearchResponse>(`${BASE_URL}/search/`, {
            params: {
                apiKey: apiKey,
                search_field: "name",
                search_value: query,
            },
        });

        if (
            !searchRes.data ||
            !searchRes.data.title_results ||
            searchRes.data.title_results.length === 0
        ) {
            return NextResponse.json<MoviesSearchResponse>({
                message: "Cannot retrieve  movie search results", movies: [], errors: [`Movie title  ${query} not found`]
            }, { status: 404 }
            );
        }

        // todo type properly

        const results: WatchmodeTitleResult[] = searchRes.data.title_results;
        // filter AND extract only id, title, year, type
        const movies: MovieData[] = results
            .filter((movie) => movie.tmdb_type === "movie")
            .map((movie) => ({
                id: movie.id,
                title: movie.name,
                year: movie.year,
                type: movie.type,
            }));

        return NextResponse.json<MoviesSearchResponse>({
            message: `Search results for movie: ${query}`, movies: movies, errors: null
        }, { status: 200 });
    } catch (error: unknown) {
        console.error("Error processing search request:", error);
        return NextResponse.json<MoviesSearchResponse>({
            message: "Server error", movies: [], errors: [error instanceof Error ? error.message : "Unknown POST /api/search"]
        }, { status: 500 });
    }
}