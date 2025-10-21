'use client';
import React, { createContext, useCallback, useContext, useReducer } from 'react';
import axios from 'axios';
// type imports 

import type { ReactNode } from 'react';
import type { MovieDetailsData, MovieDetailsResponse, WatchlistMovieData, WatchlistResponse } from "@/app/types/shared/types";

type MovieResult = {
  id: number;
  title: string;
  year: string;
};


type MoviesState = {
  searchResults: MovieResult[]; // Array of movie results from search
  currentMovie: MovieDetailsData | null; // Detailed info of the selected movie
  loading: boolean; // Loading state for async operations
  error: string | null; // Error message if any operation fails
  // current watchlist array of movie IDs and title
  watchlist: WatchlistMovieData[];
};

// actions
// Watchmode API related actions
type WatchmodeAPIRequest = { type: "WATCHMODE_API_REQUEST", payload: { loading: boolean; error: null } };
type SearchSuccess = { type: "SEARCH_SUCCESS", payload: { searchResults: MovieResult[]; loading: boolean; error: null } };
type FetchMovieDetailsSuccess = { type: "FETCH_MOVIE_DETAILS_SUCCESS", payload: { currentMovie: MovieDetailsData; loading: boolean; error: null } };

// watchlist actions, handled by NEXT.js API routes
type WatchListRequest = { type: "WATCHLIST_REQUEST", payload: { loading: boolean; error: null } };
type FetchWatchlistSuccess = { type: "FETCH_WATCHLIST_SUCCESS", payload: { watchlist: WatchlistMovieData[]; loading: boolean; error: null } };
type AddToWatchlistSuccess = { type: "ADD_TO_WATCHLIST_SUCCESS", payload: { watchlist: WatchlistMovieData[]; loading: boolean; error: null } };
type RemoveFromWatchlistSuccess = { type: "REMOVE_FROM_WATCHLIST_SUCCESS", payload: { watchlist: WatchlistMovieData[]; loading: boolean; error: null } };
// NON API actions
type ClearCurrentMovie = { type: "CLEAR_CURRENT_MOVIE", payload: { currentMovie: null } };
// Generic error action
type MoviesError = { type: "MOVIES_ERROR", payload: { loading: boolean; error: string } };

type MoviesAction = (
  | WatchmodeAPIRequest | SearchSuccess | FetchMovieDetailsSuccess
  | WatchListRequest | FetchWatchlistSuccess | AddToWatchlistSuccess | RemoveFromWatchlistSuccess
  | ClearCurrentMovie
  | MoviesError
)

const initialState: MoviesState = {
  searchResults: [],
  currentMovie: null,
  loading: false,
  error: null,
  watchlist: [],
};

const moviesReducer = (state: MoviesState, action: MoviesAction): MoviesState => {
  switch (action.type) {
    case "WATCHMODE_API_REQUEST": {
      return { ...state, ...action.payload };
    }
    case "SEARCH_SUCCESS": {
      return { ...state, ...action.payload };
    }
    case "FETCH_MOVIE_DETAILS_SUCCESS": {
      return { ...state, ...action.payload };
    }
    // watchlist actions
    case "WATCHLIST_REQUEST": {
      return { ...state, ...action.payload };
    }
    case "FETCH_WATCHLIST_SUCCESS": {
      return { ...state, ...action.payload };
    }
    case "ADD_TO_WATCHLIST_SUCCESS": {
      return { ...state, ...action.payload };
    }
    case "REMOVE_FROM_WATCHLIST_SUCCESS": {
      return { ...state, ...action.payload };
    }
    case "CLEAR_CURRENT_MOVIE": {
      return { ...state, ...action.payload };
    }
    case "MOVIES_ERROR": {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};

interface IMoviesInterface extends MoviesState {
  dispatchSearch: (query: string) => Promise<void>;
  dispatchFetchMovieDetails: (movieId: number) => Promise<void>;
  dispatchFetchWatchlist: (userId: string) => Promise<void>;
  dispatchClearCurrentMovie: () => void;
  dispatchAddToWatchlist: (userId: string, movie: MovieDetailsData) => Promise<void>;
}

export const MoviesContext = createContext<IMoviesInterface | null>(null);

const MoviesProvider = ({ children }: { children: ReactNode; }) => {
  const [state, dispatch] = useReducer(moviesReducer, initialState);

  //memoized functions to reduce re-renders

  // Function to search for movies by title
  const dispatchSearch = useCallback(
    async (query: string): Promise<void> => {
      dispatch({ type: "WATCHMODE_API_REQUEST", payload: { loading: true, error: null } });
      try {
        const response = await axios.post('/api/search', { query });
        const movies: MovieResult[] = response.data;
        dispatch({ type: "SEARCH_SUCCESS", payload: { searchResults: movies, loading: false, error: null } });
      } catch (error: any) {
        dispatch({ type: "MOVIES_ERROR", payload: { loading: false, error: error.message } });
      }
    }, []);

  // function to fetch detailed info for a specific movie by ID
  const dispatchFetchMovieDetails = useCallback(
    async (movieId: number): Promise<void> => {
      dispatch({ type: "WATCHMODE_API_REQUEST", payload: { loading: true, error: null } });
      try {
        const response = await axios.post('/api/search_movie_details', { movieId });
        const { message, movieData } = response.data as MovieDetailsResponse;

        // last resort error handling if object is empty
        if (!movieData) {
          throw new Error(message || "No movie data found");
        }

        dispatch({ type: "FETCH_MOVIE_DETAILS_SUCCESS", payload: { currentMovie: movieData, loading: false, error: null } });

      } catch (error: any) {
        dispatch({ type: "MOVIES_ERROR", payload: { loading: false, error: error.message } });
      }
    }, []);

  // function to fetch the user's watchlist
  const dispatchFetchWatchlist = useCallback(
    async (userId: string): Promise<void> => {
      dispatch({ type: "WATCHLIST_REQUEST", payload: { loading: true, error: null } });
      try {
        const response = await axios.get(`/api/watchlist`, { params: { userId } });
        const { watchlist } = response.data as WatchlistResponse;
        dispatch({ type: "FETCH_WATCHLIST_SUCCESS", payload: { watchlist: watchlist, loading: false, error: null } });
      } catch (error: any) {
        dispatch({ type: "MOVIES_ERROR", payload: { loading: false, error: error.message } });
      }
    }, []);

  // function to clear the current movie details
  const dispatchClearCurrentMovie = useCallback(
    (): void => {
      dispatch({ type: "CLEAR_CURRENT_MOVIE", payload: { currentMovie: null } });
    }, []);

  // function to add a movie to the user's watchlist
  const dispatchAddToWatchlist = useCallback(
    async (userId: string, movieData: MovieDetailsData): Promise<void> => {
      // initiate request
      dispatch({ type: "WATCHLIST_REQUEST", payload: { loading: true, error: null } });
      try {
        const response = await axios.post('/api/watchlist', { userId, movieData });
        const { watchlist } = response.data as WatchlistResponse;
        // update watchlist in state 
        dispatch({ type: "ADD_TO_WATCHLIST_SUCCESS", payload: { watchlist, loading: false, error: null } });
        // clear current movie after adding to watchlist?

        // display delete button in watchlist instead of add button?

      } catch (error: any) {
        dispatch({ type: "MOVIES_ERROR", payload: { loading: false, error: error.message } });
      }
    }, []);

  return (
    <MoviesContext.Provider value={{ ...state, dispatchSearch, dispatchFetchMovieDetails, dispatchClearCurrentMovie, dispatchFetchWatchlist, dispatchAddToWatchlist }}>
      {children}
    </MoviesContext.Provider>
  );
};

export const useMoviesContext = () => {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error("useMoviesContext must be used within a MoviesProvider");
  }
  return context;
};

export default MoviesProvider;