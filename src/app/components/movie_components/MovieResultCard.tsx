"use client";
import React from 'react';
// Bootstrap components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// MoviesContext
import { useMoviesContext } from '@/app/context/movies/MoviesContext';


export type MovieResultCardProps = {
    id: number;
    title: string;
    year: number | string;
};

const MovieResultCard: React.FC<MovieResultCardProps> = ({ id, title, year }) => {

    const { dispatchFetchMovieDetails } = useMoviesContext();

    const getMovieDetails = async () => {
        await dispatchFetchMovieDetails(id);
        // The modal display is now handled in the SearchComponent when currentMovie is set
    };

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Button variant="info" className="mb-3" onClick={getMovieDetails}>
                    ➕ Show Details
                </Button>
                <div>
                    <p><strong>Year:</strong> {year}</p>
                </div>

                {/* {/* <small className="text-muted">*All data here comes from Watchmode</small> */}
            </Card.Body>
        </Card>
    );
};

export default MovieResultCard