// GET Route to fetch the authenticated user's watchlist
// POST Route to add a movie to the authenticated user's watchlist
// DELETE Route to remove a movie from the authenticated user's watchlist

import { NextResponse, NextRequest } from "next/server";
// models and database
import User from "@/models/userModel";
import Movie from "@/models/movieModel";

import { connect } from "@/dbConfig/dbConfig";
// TODO: protect the route with auth middleware
import type { IUser } from "@/models/userModel";
import type { MovieDetailsData, WatchlistMovieData, WatchlistResponse } from "@/app/types/shared/types";

// GET /api/watchlist
// TODO: Data Types for reqBody?
// Fetch the authenticated user's watchlist
export async function GET(request: NextRequest) {
    try {
        await connect();
        const reqURL = new URL(request.url);

        console.log("Full request URL: ", reqURL);
        const userId = reqURL.searchParams.get("userId");

        if (!userId) {
            return NextResponse.json<WatchlistResponse>({
                message: "Cannot retrieve watchlist", watchlist: null, errors: ["Missing user data (id) to retrieve watchlist"]
            }, { status: 400 }
            );
        }

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json<WatchlistResponse>({
                message: "Cannot retrieve watchlist", watchlist: null, errors: ["User not found"]
            }, { status: 404 }
            );
        }

        const watchlist = await Movie.find({ user: userId }) as WatchlistMovieData[];

        console.log("User's watchlist: ", watchlist);
        return NextResponse.json<WatchlistResponse>({
            message: "Watchlist fetched successfully", watchlist, errors: null
        }, { status: 200 }
        );
    } catch (error: any) {
        console.error("Error in GET /api/watchlist:", error);
        return NextResponse.json<WatchlistResponse>({
            message: "Server error", watchlist: null, errors: [error.message || "Unknown GET /watchlist error"]
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
                message: "Cannot add to watchlist", watchlist: null, errors: ["Missing data to add to watchlist"]
            }, { status: 400 }
            );
        }

        const { userId, movieData } = reqBody as { userId: string; movieData: MovieDetailsData };

        const user = await User.findById(userId) as IUser | null;
        if (!user) {
            return NextResponse.json<WatchlistResponse>({
                message: "Cannot add to watchlist", watchlist: null, errors: ["User not found"]
            }, { status: 404 }
            );
        }
        // check if movie already in watchlist
        const existingMovie = await Movie.findOne({ user: userId, watchmodeId: movieData.id });
        console.log("Existing movie in watchlist: ", existingMovie);
        if (existingMovie) {
            return NextResponse.json<WatchlistResponse>({
                message: "Movie already in watchlist", watchlist: null, errors: ["Duplicate movie"]
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
            message: "Server error", watchlist: null, errors: [error.message || "Unknown POST /watchlist error"]
        }, { status: 500 }
        );
    }
};


