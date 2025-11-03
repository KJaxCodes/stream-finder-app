import axios from "axios";
import React from "react";
// types
import { MoviesAction } from "../actions";

export const handleMoviesErrorDispatch = (error: unknown, dispatch: React.Dispatch<MoviesAction>) => {
    if (axios.isAxiosError(error)) {
        console.error("Axios library error:", error.message);
        dispatch({ type: "MOVIES_ERROR", payload: { loading: false, error: error.message } });
    } else if (error instanceof Error) {
        console.error("General error:", error.message);
        dispatch({ type: "MOVIES_ERROR", payload: { loading: false, error: error.message } });
    } else {
        console.error("Unknown error:", error);
        dispatch({ type: "MOVIES_ERROR", payload: { loading: false, error: "Major error occurred." } });
    }
};