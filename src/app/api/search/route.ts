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

        // Call the watchmode api to search for the movie
        const response = await axios.get(`https://api.watchmode.com/v1/search/?apiKey=${apiKey}&search_field=name&search_value=${query}&types=movie`);

        // Add validation later

        console.log("Search results from Watchmode API: ", response.data);

        return new Response(JSON.stringify(response.data), { status: 200 });

    }
    catch (error) {
        console.error("Error occurred while searching for movie:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}