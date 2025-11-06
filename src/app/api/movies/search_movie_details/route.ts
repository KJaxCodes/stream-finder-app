//this route will handle a search request and call the watchmode api to get movie details

// NextResponse 
import { NextResponse } from "next/server";
import axios from "axios";
// types
import type { MovieDetailsData, MovieDetailsResponse, WatchmodeCastCrewData, WatchmodeStreamingSource } from "@/app/types/shared/types";
// auth helpers
import { verifyServerAuth } from "../../helpers/authHelpers";

// POST /api/movies/search_movie_details
export async function POST(request: Request) {
    try {
        const userTokenData = await verifyServerAuth();
        if (!userTokenData) {
            return NextResponse.json<MovieDetailsResponse>(
                { message: "Unauthorized", movieData: null },
                { status: 401 }
            );
        }
        const reqBody = await request.json();
        const { movieId } = reqBody;

        if (!movieId) {
            return NextResponse.json(
                { message: "Movie ID is required", movieData: null },
                { status: 400 }
            );
        }

        const apiKey = process.env.WATCHMODE_API_KEY; // Use server-side environment variable

        if (!apiKey) {
            return NextResponse.json(
                { message: "API key not configured", movieData: null },
                { status: 403 }
            );
        }

        // Watchmode API endpoints
        const MOVIE_DETAILS_URL = `https://api.watchmode.com/v1/title/${movieId}/details/`;
        const CAST_CREW_URL = `https://api.watchmode.com/v1/title/${movieId}/cast-crew/`;
        const SOURCES_URL = `https://api.watchmode.com/v1/title/${movieId}/sources/`;

        const detailsResponse = await axios.get(MOVIE_DETAILS_URL, {
            params: {
                apiKey: apiKey,
                regions: "US",
            },
        });

        if (!detailsResponse.data) {
            return NextResponse.json({ message: "No details found", movieData: null }, { status: 404 });
        }

        const movieDetails = detailsResponse.data;
        const detailsData: MovieDetailsData = {
            id: movieDetails.id,
            title: movieDetails.title,
            summary: movieDetails.plot_overview,
            runtime: movieDetails.runtime_minutes,
            year: movieDetails.year,
            rating: movieDetails.us_rating,
            imdbRating: movieDetails.user_rating,
            genres: movieDetails.genre_names,
            posterURL: movieDetails.poster,
            director: [],
            cast: [],
            streamingOn: [],
        };

        // Fetch cast and crew
        const castCrewResponse = await axios.get(CAST_CREW_URL, {
            params: { apiKey: apiKey },
        });

        if (castCrewResponse.data) {
            movieDetails.director = "Not Available";
            movieDetails.cast = "Not Available";
        }

        // grab actors only
        const actors = castCrewResponse.data.filter((castData: WatchmodeCastCrewData) => castData.type === "Cast").map((actorData: WatchmodeCastCrewData) => actorData.full_name).slice(0, 10);

        const directors = castCrewResponse.data
            .filter((crewData: WatchmodeCastCrewData) => {
                const firstRole = crewData.role.split(",")[0].trim().toLowerCase();
                return firstRole === "director";
            })
            .map((directorData: WatchmodeCastCrewData) => directorData.full_name);
        detailsData.cast = actors;
        detailsData.director = directors;

        // fetch streaming sources
        const sourcesResponse = await axios.get(SOURCES_URL, {
            params: { apiKey: apiKey, regions: "US" },
        });

        if (!sourcesResponse.data || sourcesResponse.data.length === 0) {
            detailsData.streamingOn = ["Not Available"];
        }

        detailsData.streamingOn = [... new Set<string>(sourcesResponse.data.map((source: WatchmodeStreamingSource) => source.name))];

        return NextResponse.json<MovieDetailsResponse>({ message: "Success", movieData: detailsData }, { status: 200 });
    } catch (error) {
        console.error("Error processing search request:", error);
        return NextResponse.json<MovieDetailsResponse>(
            { message: "General server error processing movie details request", movieData: null },
            { status: 500 }
        );
    }
}