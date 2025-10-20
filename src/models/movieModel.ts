import mongoose, { Document, Schema } from "mongoose";

export interface IMovie extends Document {
    _id: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    watchmodeId: number;
    title: string;
    summary: string;
    runtime: number;
    year: number;
    rating: string;
    imdbRating: number;
    genres: string[];
    posterURL: string;
    director: string[];
    cast: string[];
    streamingOn: string[];
}

// Define the Movie schema
// Review watchmode API for additional fields to include or updates to existing fields
const movieSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    watchmodeId: {
        type: Number,
    },
    title: {
        type: String,
    },
    summary: {
        type: String, default: "No summary available"
    },
    runtime: {
        type: Number,
    },
    year: {
        type: Number,
    },
    rating: {
        type: String, default: "Not Rated"
    },
    imdbRating: {
        type: Number,
        default: 0
    },
    genres: {
        type: [String],
    },
    posterURL: {
        type: String,
        default: "No poster available"
    },
    director: {
        type: [String],
        default: ["Unknown"]
    },
    cast: {
        type: [String],
        default: ["Unknown"]
    },
    streamingOn: {
        type: [String],
        default: []
    }
});

const Movie = mongoose.models.movies || mongoose.model<IMovie>('movies', movieSchema);

export default Movie;