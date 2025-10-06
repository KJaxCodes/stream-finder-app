//this route will handle a search request and call the watchmode api

import axios from "axios";

export async function POST(request: Request) {
    try {
        const reqBody = await request.json();
        const { query } = reqBody;
        console.log("Search query: ", query);

        const apiKey = process.env.WATCHMODE_API_KEY; // Use server-side environment variable

        if (!apiKey) {
            return new Response(JSON.stringify({ message: 'API key not configured' }), { status: 500 });
        }

        const BASE_URL = 'https://api.watchmode.com/v1';

        // Add validation for query later

        // Call the watchmode api to search for the movie
        const searchRes = await axios.get(`${BASE_URL}/search/`, {
            params: {
                apiKey: apiKey,
                search_field: 'name',
                search_value: query,
                types: 'movie'
            }
        });
        console.log("Search results: ", searchRes.data);

        // Extract top 5 results
        const movies = searchRes.data.title_results.slice(0, 5).map((movie: any) => ({
            id: movie.id,
            title: movie.name
        }));

        if (!movies.length) {
            return new Response(JSON.stringify({ message: 'No results found' }), { status: 404 });
        }

        // Fetch details for each movie
        const movieDetails = [];
        for (const movie of movies) {
            try {
                const detailsRes = await axios.get(`${BASE_URL}/title/${movie.id}/details/`, {
                    params: { apiKey, regions: 'US' }
                });
                const sourcesRes = await axios.get(`${BASE_URL}/title/${movie.id}/sources/`, {
                    params: { apiKey, regions: 'US' }
                });
                const castCrewRes = await axios.get(`${BASE_URL}/title/${movie.id}/cast-crew/`, {
                    params: { apiKey }
                });

                const details = detailsRes.data;
                const sources = sourcesRes.data;
                const castCrew = castCrewRes.data;

                // If no details found, skip this movie
                if (!details) continue;

                // If no sources found, skip this movie
                if (!sources || sources.length === 0) continue;

                // Compile movie details
                movieDetails.push({
                    id: movie.id,
                    title: details.title,
                    year: details.year,
                    posterUrl: details.poster,
                    rating: details.us_rating,
                    imdbRating: details.imdb_rating,
                    genres: details.genre_names,
                    director: castCrew.crew,
                    cast: castCrew.cast,
                    summary: details.plot_overview,
                    streamingOn: Array.from(new Set(sources.map((source: any) => source.name))),
                    runtime: details.runtime_minutes
                });
            } catch (error) {
                console.error(`Error fetching details for movie ID ${movie.id}:`, error);
            }
        }
        return new Response(JSON.stringify(movieDetails), { status: 200 });
    } catch (error) {
        console.error("Error processing search request:", error);
        return new Response(JSON.stringify({ message: 'Error processing request' }), { status: 500 });
    }

}