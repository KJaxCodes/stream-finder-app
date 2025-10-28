import type { MoviesState } from "./types";
import type { MoviesAction } from "./actions";

export const moviesReducer = (state: MoviesState, action: MoviesAction): MoviesState => {
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
    case "CLEAR_SEARCH_RESULTS": {
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