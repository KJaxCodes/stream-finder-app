// component to display user's watchlist within their profile

"use client";

import React from "react";
import { useMoviesContext } from "@/app/context/MoviesContext";
import Card from "react-bootstrap/Card";

const WatchlistComponent: React.FC = () => {
    const { watchlist } = useMoviesContext();

    if (!watchlist || watchlist.length === 0) {
        return <p className="mt-4">Your watchlist is empty. Add some movies to get started!</p>;
    }

    return (
        <div className="mt-4">
            <h3>Your Watchlist</h3>
            {watchlist.map(({ movieId, title }) => (
                <Card key={movieId} className="mb-3">
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>Movie ID: {movieId}</Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default WatchlistComponent;