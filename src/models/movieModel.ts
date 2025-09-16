import mongoose from "mongoose";

// Define the Movie schema
// Review watchmode API for additional fields to include or updates to existing fields
const movieSchema = new mongoose.Schema({
    watchmodeId: {
        type: Number,
    },
    title: {
        type: String,
    },
    year: {
        type: Number,
    },
    genre: {
        type: [String],
    },
    director: String,
    actors: [String],
    plot: String,
    posterUrl: String,
    imdbRating: Number,
    runtimeMinutes: Number,
    streamingOn: Array<string> // Array of streaming service names
});

const Movie = mongoose.models.movies || mongoose.model('movies', movieSchema);

export default Movie;