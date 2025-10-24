// GET Route to fetch the authenticated user's watchlist
// POST Route to add a movie to the authenticated user's watchlist
// DELETE Route to remove a movie from the authenticated user's watchlist

import { NextResponse, NextRequest } from "next/server";
// models and database
import User from "@/models/userModel";
import Movie from "@/models/movieModel";

import { connect } from "@/dbConfig/dbConfig";
// TODO: protect the route 
import type { IUser } from "@/models/userModel";
import type { IMovie } from "@/models/movieModel";
import type { MovieDetailsData, WatchlistMovieData, WatchlistResponse } from "@/app/types/shared/types";

// GET /api/watchlist
// TODO: Data Types for reqBody?
export async function GET(request: NextRequest) {
    try {
        await connect();
        const reqURL = new URL(request.url);

        console.log("Full request URL: ", reqURL);
        const userId = reqURL.searchParams.get("userId");

        if (!userId) {
            return NextResponse.json<WatchlistResponse>({
                message: "Cannot retrieve watchlist", watchlist: [], errors: ["Missing user data (id) to retrieve watchlist"]
            }, { status: 400 }
            );
        }

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json<WatchlistResponse>({
                message: "Cannot retrieve watchlist", watchlist: [], errors: ["User not found"]
            }, { status: 404 }
            );
        }

        const watchlist = await Movie.find({ user: userId }) as IMovie[];

        const watchlistData: WatchlistMovieData[] = watchlist.map((movie) => ({
            objectId: movie._id.toString(),
            title: movie.title,
            year: movie.year,
            summary: movie.summary,
            posterURL: movie.posterURL,
            streamingOn: movie.streamingOn,
            watchmodeId: movie.watchmodeId,
        }));

        console.log("User's watchlist: ", watchlist);
        return NextResponse.json<WatchlistResponse>({
            message: "Watchlist fetched successfully", watchlist: watchlistData, errors: null
        }, { status: 200 }
        );
    } catch (error: any) {
        console.error("Error in GET /api/watchlist:", error);
        return NextResponse.json<WatchlistResponse>({
            message: "Server error", watchlist: [], errors: [error.message || "Unknown GET /watchlist error"]
        }, { status: 500 }
        );
    }
}

// POST /api/watchlist
// Add a movie to the authenticated user's watchlist
export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();

        // basic validation
        if (!reqBody || !reqBody.userId || !reqBody.movieData) {
            return NextResponse.json<WatchlistResponse>({
                message: "Cannot add to watchlist", watchlist: [], errors: ["Missing data to add to watchlist"]
            }, { status: 400 }
            );
        }

        const { userId, movieData } = reqBody as { userId: string; movieData: MovieDetailsData };

        const user = await User.findById(userId) as IUser | null;
        if (!user) {
            return NextResponse.json<WatchlistResponse>({
                message: "Cannot add to watchlist", watchlist: [], errors: ["User not found"]
            }, { status: 404 }
            );
        }
        // check if movie already in watchlist
        const existingMovie = await Movie.findOne({ user: userId, watchmodeId: movieData.id }) as IMovie | null;
        console.log("Existing movie in watchlist: ", existingMovie);
        if (existingMovie) {
            return NextResponse.json<WatchlistResponse>({
                message: "Movie already in watchlist", watchlist: [], errors: ["Duplicate movie"]
            }, { status: 400 }
            );
        }

        // create new movie document
        const newMovie = new Movie({ ...movieData, watchmodeId: movieData.id, user: userId });
        await newMovie.save();

        // add movie to user's watchlist
        user.watchlist.push(newMovie._id);
        await user.save();

        // fetch updated watchlist
        const updatedWatchlist = await Movie.find({ user: userId }) as WatchlistMovieData[];


        return NextResponse.json<WatchlistResponse>({
            message: "Movie added to watchlist", watchlist: updatedWatchlist, errors: null
        }, { status: 201 }
        );

    } catch (error: any) {
        console.error("Error in POST /api/watchlist:", error);
        return NextResponse.json<WatchlistResponse>({
            message: "Server error", watchlist: [], errors: [error.message || "Unknown POST /watchlist error"]
        }, { status: 500 }
        );
    }
};

// DELETE /api/watchlist
// Remove a movie from the authenticated user's watchlist

export async function DELETE(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();

        const { userId, movieId } = reqBody as { userId: string; movieId: string };
        console.log("DELETE request body: ", reqBody);

        // basic validation check to ensure userId and movieId are provided
        if (!userId || !movieId) {
            return NextResponse.json<WatchlistResponse>({
                message: "Cannot delete from watchlist",
                watchlist: [],
                errors: ["Missing data to delete from watchlist"]
            }, { status: 404 });
        }

        // find user by ID, user will include watchlist reference to get movie ID to delete
        const user = await User.findById(userId) as IUser | null;
        if (!user) {
            return NextResponse.json<WatchlistResponse>({
                message: "Cannot delete from watchlist",
                watchlist: [],
                errors: ["User not found"]
            }, { status: 404 });
        }

        // remove movie from the movie collection
        await Movie.deleteOne({ _id: movieId, user: userId });

        // remove movie object id from user's watchlist array
        user.watchlist = user.watchlist.filter(id => id.toString() !== movieId);
        await user.save();

        // Fetch updated watchlist
        const updatedWatchlist = await Movie.find({ user: userId }) as IMovie[];

        // Map to WatchlistMovieData format
        const watchlistData: WatchlistMovieData[] = updatedWatchlist.map((movie) => ({
            objectId: movie._id.toString(),
            title: movie.title,
            year: movie.year,
            summary: movie.summary,
            posterURL: movie.posterURL,
            streamingOn: movie.streamingOn,
            watchmodeId: movie.watchmodeId,
        }));

        // return updated watchlist
        return NextResponse.json<WatchlistResponse>({
            message: "Movie deleted from watchlist",
            watchlist: watchlistData,
            errors: null
        }, { status: 200 }
        );
    }
    // CATCH block to handle errors
    catch (error: any) {
        console.error("Error in DELETE /api/watchlist:", error);
        return NextResponse.json<WatchlistResponse>({
            message: "Server error",
            watchlist: [],
            errors: [error.message || "Unknown DELETE /watchlist error"]
        }, { status: 500 }
        );
    }
};