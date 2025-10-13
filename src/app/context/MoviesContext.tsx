// movies, setMovies, loading, error

'use client';
import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios';
// type imports 

import type { ReactNode } from 'react';
import type { MovieDetailsData, MovieDetailsResponse } from "@/app/types/shared/types";

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
  watchlist: { movieId: string; title: string }[];
};

// actions
type SearchRequest = { type: "SEARCH_REQUEST", payload: { loading: boolean; error: null } };
type SearchSuccess = { type: "SEARCH_SUCCESS", payload: { searchResults: MovieResult[]; loading: boolean; error: null } };
type FetchMovieDetailsRequest = { type: "FETCH_MOVIE_DETAILS_REQUEST", payload: { loading: boolean; error: null } };
type FetchMovieDetailsSuccess = { type: "FETCH_MOVIE_DETAILS_SUCCESS", payload: { currentMovie: MovieDetailsData; loading: boolean; error: null } };
type ClearCurrentMovie = { type: "CLEAR_CURRENT_MOVIE", payload: { currentMovie: null } };
type MoviesError = { type: "MOVIES_ERROR", payload: { loading: boolean; error: string } };

type MoviesAction = ClearCurrentMovie | SearchRequest | SearchSuccess | FetchMovieDetailsRequest | FetchMovieDetailsSuccess | ClearCurrentMovie | MoviesError;

const initialState: MoviesState = {
  searchResults: [],
  currentMovie: null,
  loading: false,
  error: null,
  watchlist: [],
};

const moviesReducer = (state: MoviesState, action: MoviesAction): MoviesState => {
  switch (action.type) {
    case "CLEAR_CURRENT_MOVIE": {
      return { ...state, ...action.payload };
    }
    case "SEARCH_REQUEST": {
      return { ...state, ...action.payload };
    }
    case "SEARCH_SUCCESS": {
      return { ...state, ...action.payload };
    }
    case "FETCH_MOVIE_DETAILS_REQUEST": {
      return { ...state, ...action.payload };
    }
    case "FETCH_MOVIE_DETAILS_SUCCESS": {
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
  dispatchClearCurrentMovie: () => void;
}

export const MoviesContext = createContext<IMoviesInterface | null>(null);

const MoviesProvider = ({ children }: { children: ReactNode; }) => {
  const [state, dispatch] = useReducer(moviesReducer, initialState);

  // Function to search for movies by title
  const dispatchSearch = async (query: string): Promise<void> => {
    dispatch({ type: "SEARCH_REQUEST", payload: { loading: true, error: null } });
    try {
      const response = await axios.post('/api/search', { query });
      const movies: MovieResult[] = response.data;
      dispatch({ type: "SEARCH_SUCCESS", payload: { searchResults: movies, loading: false, error: null } });
    } catch (error: any) {
      dispatch({ type: "MOVIES_ERROR", payload: { loading: false, error: error.message } });
    }
  };

  // function to fetch detailed info for a specific movie by ID
  const dispatchFetchMovieDetails = async (movieId: number): Promise<void> => {
    dispatch({ type: "FETCH_MOVIE_DETAILS_REQUEST", payload: { loading: true, error: null } });
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
  };

  // function to clear the current movie details
  const dispatchClearCurrentMovie = (): void => {
    dispatch({ type: "CLEAR_CURRENT_MOVIE", payload: { currentMovie: null } });
  };

  return (
    <MoviesContext.Provider value={{ ...state, dispatchSearch, dispatchFetchMovieDetails, dispatchClearCurrentMovie }}>
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