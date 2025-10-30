export type UserTokenData = {
    id: string;
    email: string;
};


// shared between the /api/search_movie_details route and frontend components/context
export type MovieDetailsData = {
    // first batch of details
    // watchmode movie ID
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
    streamingOn: string[]; // array of streaming service names
};
export type MovieDetailsResponse = {
    message: string;
    movieData: MovieDetailsData | null;
};



// watchlist movie data
export type WatchlistMovieData = {
    // MongoDB ObjectId as string
    objectId: string;
    title: string;
    year: number;
    summary: string;
    posterURL: string;
    streamingOn: string[];
    // watchmode movie ID
    watchmodeId: number;
    // any additional fields specific to watchlist can be added here
};

// response type for movies routes (anything through Wathmode)
export type MovieData = {
    id: number;
    title: string;
    year: number;
    type: string;
};
export type MoviesSearchResponse = {
    message: string;
    movies: MovieData[];
    errors: string[] | null;
}

// response type for watchlist routes
export type WatchlistResponse = {
    message: string;
    watchlist: WatchlistMovieData[];
    errors: string[] | null;
};