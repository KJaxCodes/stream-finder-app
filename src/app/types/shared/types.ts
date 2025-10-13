export type UserTokenData = {
    id: string;
    email: string;
};

// shared between the /api/search_movie_details route and frontend components/context
export type MovieDetailsData = {
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
    streamingOn: string[]; // array of streaming service names
};
export type MovieDetailsResponse = {
    message: string;
    movieData: MovieDetailsData | null;
};

