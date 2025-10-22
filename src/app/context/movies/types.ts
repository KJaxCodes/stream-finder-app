import type { MovieDetailsData } from "@/app/types/shared/types";
import type { WatchlistMovieData } from "@/app/types/shared/types";

export type MovieResult = {
  id: number;
  title: string;
  year: string;
};

export type MoviesState = {
  searchResults: MovieResult[]; // Array of movie results from search
  currentMovie: MovieDetailsData | null; // Detailed info of the selected movie
  loading: boolean; // Loading state for async operations
  error: string | null; // Error message if any operation fails
   // current watchlist array of movie IDs and title
  watchlist: WatchlistMovieData[];
};

export interface IMoviesInterface extends MoviesState {
  dispatchSearch: (query: string) => Promise<void>;
  dispatchFetchMovieDetails: (movieId: number) => Promise<void>;
  dispatchFetchWatchlist: (userId: string) => Promise<void>;
  dispatchAddToWatchlist: (userId: string, movieData: MovieDetailsData) => Promise<void>;
  dispatchClearCurrentMovie: () => void;
};