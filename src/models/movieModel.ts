import mongoose, { Schema } from "mongoose";

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

const Movie = mongoose.models.movies || mongoose.model('movies', movieSchema);

export default Movie;