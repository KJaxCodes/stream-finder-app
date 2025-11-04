import axios from "axios";
//
import type { MoviesAction } from "../actions";

export const handleMoviesErrorDispatch = (error: unknown, dispatch: React.Dispatch<MoviesAction>) => {
    if (axios.isAxiosError(error)) {
        console.error("Axios library error");
        dispatch({ type: "MOVIES_ERROR", payload: { loading: false, error: error.response?.data } });
    } else if (error instanceof Error) {
        console.error(error);
        dispatch({ type: "MOVIES_ERROR", payload: { loading: false, error: error.message } });
    } else {
        console.error("Unknown error");
        dispatch({ type: "MOVIES_ERROR", payload: { loading: false, error: "Really bad error" } });
    }
};