//this route will handle a request for movie details by id and call the watchmode api

import axios from "axios";

type MovieDetailsData = {
    // first batch of details
    id: number;
    title: string;
    summary: string;
    runtime: number;
    year: string;
    imdbRating: number;
    genres: string[];
    rating: string;
    posterURL: string;
    // second batch of details
    director: string[];
    cast: string[];
    // third batch of details
    streamingOn: string[];
};


export async function POST(request: Request) {
    try {
        const reqBody = await request.json();
        const { movieId } = reqBody;
        console.log("Movie ID is: ", movieId);

        if (!movieId) {
            return new Response(
                JSON.stringify({ message: "Movie ID is required" }),
                { status: 400 }
            );
        }

        const apiKey = process.env.WATCHMODE_API_KEY; // Use server-side environment variable

        if (!apiKey) {
            return new Response(
                JSON.stringify({ message: "API key not configured" }),
                { status: 500 }
            );
        }

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
            return new Response(JSON.stringify({ message: "No details found" }), {
                status: 404,
            });
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

        // if no cast and crew data found, set to not available
        if (!castCrewResponse.data) {
            movieDetails.director = "Not Available";
            movieDetails.cast = "Not Available";
        }

        // grab actors only
        const actors = castCrewResponse.data.filter((castData: any) => castData.type === "Cast").map((actorData: any) => actorData.full_name).slice(0, 10);

        const directors = castCrewResponse.data
            .filter((crewData: any) => {
                const firstRole = crewData.role.split(",")[0].trim().toLowerCase();
                return firstRole === "director";
            })
            .map((directorData: any) => directorData.full_name);

        detailsData.cast = actors;
        detailsData.director = directors;

        // fetch streaming sources
        const sourcesResponse = await axios.get(SOURCES_URL, {
            params: { apiKey: apiKey, regions: "US" },
        });

        if (!sourcesResponse.data || sourcesResponse.data.length === 0) {
            detailsData.streamingOn = ["Not Available"];
        }

        // grab unique source names
        detailsData.streamingOn = Array.from(new Set(sourcesResponse.data.map((source: any) => source.name)));

        return new Response(JSON.stringify({ message: "Success", movieData: detailsData }), { status: 200 });
        
    } catch (error) {
        console.error("Error processing search request:", error);
        return new Response(
            JSON.stringify({ message: "Error processing request" }),
            { status: 500 }
        );
    }
}