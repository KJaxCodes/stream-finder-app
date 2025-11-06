"use client";
import React, { createContext, ReactNode, useContext, useReducer, useCallback } from "react";
// axios
import axios from "axios";
// reducer
import { moviesReducer } from "./moviesReducer";
// types
import type { MovieDetailsData, MovieDetailsResponse, WatchlistResponse } from "@/app/types/shared/types";
import type { IMoviesInterface, MovieResult, MoviesState } from "./types";
// helpers
import { handleMoviesErrorDispatch } from "./helpers/errorHelpers";


const initialState: MoviesState = {
  searchResults: [],
  currentMovie: null,
  loading: false,
  error: null,
  watchlist: [],
};

export const MoviesContext = createContext<IMoviesInterface | null>(null);

const MoviesProvider = ({ children }: { children: ReactNode; }) => {
  const [state, dispatch] = useReducer(moviesReducer, initialState);

  // Function to search for movies by title
  // memoize with useCallback to prevent unnecessary re-renders 
  const dispatchSearch = useCallback(
    async (query: string): Promise<void> => {
      dispatch({ type: "WATCHMODE_API_REQUEST", payload: { loading: true, error: null } });
      try {
        const response = await axios.post('/api/movies/search', { query });
        // console.log('Search API response:', response.data.movies);
        const movies: MovieResult[] = response.data.movies;
        dispatch({ type: "SEARCH_SUCCESS", payload: { searchResults: movies, loading: false, error: null } });
      } catch (error: unknown) {
        handleMoviesErrorDispatch(error, dispatch);
      }
    }, []
  );

  // function to fetch detailed info for a specific movie by ID
  const dispatchFetchMovieDetails = useCallback(
    async (movieId: number): Promise<void> => {
      dispatch({ type: "WATCHMODE_API_REQUEST", payload: { loading: true, error: null } });
      try {
        const response = await axios.post('/api/movies/search_movie_details', { movieId });
        const { message, movieData } = response.data as MovieDetailsResponse;

        // last resort error handling if object is empty
        if (!movieData) {
          throw new Error(message || "No movie data found");
        }

        dispatch({ type: "FETCH_MOVIE_DETAILS_SUCCESS", payload: { currentMovie: movieData, loading: false, error: null } });
      } catch (error: unknown) {
        handleMoviesErrorDispatch(error, dispatch);
      }
    }, []
  );

  // function to add a movie to a user's watchlist
  const dispatchAddToWatchlist = useCallback(
    async (userId: string, movieData: MovieDetailsData): Promise<void> => {
      dispatch({ type: "WATCHLIST_REQUEST", payload: { loading: true, error: null } });
      try {
        const response = await axios.post("/api/movies/watchlist", { userId, movieData });
        const { watchlist } = response.data as WatchlistResponse;
        dispatch({ type: "ADD_TO_WATCHLIST_SUCCESS", payload: { watchlist, loading: false, error: null } });
      } catch (error: unknown) {
        handleMoviesErrorDispatch(error, dispatch);
      }
    }, []
  );

  // function to remove a movie from a user's watchlist
  const dispatchRemoveFromWatchlist = useCallback(
    async (userId: string, movieId: string): Promise<void> => {
      dispatch({ type: "WATCHLIST_REQUEST", payload: { loading: true, error: null } });
      try {
        const response = await axios.delete("/api/movies/watchlist", { data: { userId, movieId } });
        const { watchlist } = response.data as WatchlistResponse;
        dispatch({ type: "REMOVE_FROM_WATCHLIST_SUCCESS", payload: { watchlist, loading: false, error: null } });
      } catch (error: unknown) {
        handleMoviesErrorDispatch(error, dispatch);
      }
    }, []
  );

  // function to fetch the user's watchlist
  const dispatchFetchWatchlist = useCallback(
    async (): Promise<void> => {
      dispatch({ type: "WATCHLIST_REQUEST", payload: { loading: true, error: null } });
      try {
        const response = await axios.get('/api/movies/watchlist');
        const { watchlist } = response.data as WatchlistResponse;
        dispatch({ type: "FETCH_WATCHLIST_SUCCESS", payload: { watchlist, loading: false, error: null } });
      } catch (error: unknown) {
        handleMoviesErrorDispatch(error, dispatch);
      }
    }, []
  );

  // function to clear the current movie details
  const dispatchClearCurrentMovie = useCallback((): void => {
    dispatch({ type: "CLEAR_CURRENT_MOVIE", payload: { currentMovie: null } });
  }, []);

  // function to clear search results
  const dispatchClearSearchResults = useCallback((): void => {
    dispatch({ type: "CLEAR_SEARCH_RESULTS", payload: { searchResults: [], loading: false, error: null } });
  }, []);

  return (
    <MoviesContext.Provider value={{ ...state, dispatchSearch, dispatchFetchMovieDetails, dispatchClearSearchResults, dispatchClearCurrentMovie, dispatchFetchWatchlist, dispatchAddToWatchlist, dispatchRemoveFromWatchlist }}>
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