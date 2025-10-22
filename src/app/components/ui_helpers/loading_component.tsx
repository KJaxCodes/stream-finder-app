"use client";
import React from "react";
// Simple loading component
// React Bootstrap imports
import Spinner from 'react-bootstrap/Spinner';
// Context imports  
import { useAuthContext } from "../../context/AuthContext";
import { useMoviesContext } from "../../context/movies/MoviesContext";

const LoadingComponent: React.FC = () => {
    const { loading: authLoading } = useAuthContext();
    const { loading: moviesLoading } = useMoviesContext();

    console.log("Auth loading:", authLoading);
    console.log("Movies loading:", moviesLoading);

    if (authLoading) {
        return (
            <div className="loading-spinner">
                <Spinner animation="border" variant="primary">
                </Spinner>
                <span>Processing request....</span>
            </div>
        );
    }

    if (moviesLoading) {
        return (
            <div className="loading-spinner">
                <Spinner animation="border" variant="primary">
                </Spinner>
                <span>Processing movie request...</span>
            </div>
        );
    }

    return null;
};

export default LoadingComponent;