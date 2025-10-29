//this route will handle a search request and call the watchmode api

import axios from "axios";
import { NextResponse, NextRequest } from "next/server";
// auth helpers
import { verifyServerAuth } from "../../helpers/authHelpers";

type MovieData = {
    id: number;
    title: string;
    year: number;
    type: string;
};

// POST /api/movies/search
export async function POST(request: Request) {
    try {
        const userTokenData = await verifyServerAuth();
        if (!userTokenData) {
            return new NextResponse(
                JSON.stringify({ message: "Unauthorized", results: [] }),
                { status: 401 }
            );
        }

        const reqBody = await request.json();
        const { query } = reqBody;
        console.log("Search query: ", query);

        const apiKey = process.env.WATCHMODE_API_KEY; // Use server-side environment variable

        if (!apiKey) {
            return new NextResponse(
                JSON.stringify({ message: "API key not configured" }),
                { status: 500 }
            );
        }

        const BASE_URL = "https://api.watchmode.com/v1";

        // Call the watchmode api to search for the movie
        const searchRes = await axios.get(`${BASE_URL}/search/`, {
            params: {
                apiKey: apiKey,
                search_field: "name",
                search_value: query,

            },
        });

        if (!searchRes.data || !searchRes.data.title_results || searchRes.data.title_results.length === 0) {
            return new NextResponse(JSON.stringify({ message: "No results found" }), {
                status: 404,
            });
        }

        const results = searchRes.data.title_results;
        // filter AND extract only id, title, year, type
        const movies: MovieData[] = results.filter((movie: any) => movie.tmdb_type === "movie").map((movie: any) => ({
            id: movie.id,
            title: movie.name,
            year: movie.year,
            type: movie.type
        }))

        console.log(movies);
        console.log("Number of movies found: ", movies.length);

        return new NextResponse(JSON.stringify(movies), { status: 200 });
    } catch (error) {
        console.error("Error processing search request:", error);
        return new NextResponse(
            JSON.stringify({ message: "Error processing request" }),
            { status: 500 }
        );
    }
}