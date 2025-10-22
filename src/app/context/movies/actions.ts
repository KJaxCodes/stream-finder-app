import type { MovieDetailsData, WatchlistMovieData } from "@/app/types/shared/types";
import type { MovieResult } from "./types";

// Movie state actions
// Watchmode API related actions
type WatchmodeAPIRequest = { type: "WATCHMODE_API_REQUEST", payload: { loading: boolean; error: null }};
type SearchSuccess = { type: "SEARCH_SUCCESS", payload: { searchResults: MovieResult[]; loading: boolean; error: null }};
type FetchMovieDetailsSuccess = { type: "FETCH_MOVIE_DETAILS_SUCCESS", payload: { currentMovie: MovieDetailsData; loading: boolean; error: null }};

// watchlist actions, handled by NEXT.js API routes
type WatchListRequest = { type: "WATCHLIST_REQUEST", payload: { loading: boolean; error: null }};
type FetchWatchlistSuccess = { type: "FETCH_WATCHLIST_SUCCESS", payload: { watchlist: WatchlistMovieData[]; loading: boolean; error: null }};
type AddToWatchlistSuccess = { type: "ADD_TO_WATCHLIST_SUCCESS", payload: { watchlist: WatchlistMovieData[]; loading: boolean; error: null }};
type RemoveFromWatchlistSuccess = { type: "REMOVE_FROM_WATCHLIST_SUCCESS", payload: { watchlist: WatchlistMovieData[]; loading: boolean; error: null }};
// NON API actions
type ClearCurrentMovie = { type: "CLEAR_CURRENT_MOVIE", payload: { currentMovie: null }};
// Generic error action
type MoviesError = { type: "MOVIES_ERROR", payload: { loading: boolean; error: string }};

export type MoviesAction = (
  | WatchmodeAPIRequest | SearchSuccess | FetchMovieDetailsSuccess 
  | WatchListRequest | FetchWatchlistSuccess | AddToWatchlistSuccess | RemoveFromWatchlistSuccess
  | ClearCurrentMovie
  | MoviesError
);