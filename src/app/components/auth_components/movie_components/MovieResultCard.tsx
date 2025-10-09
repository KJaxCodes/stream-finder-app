"use client";
import React from 'react';
import axios from 'axios';
// Bootstrap components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


export type MovieResultCardProps = {
    id: number;
    title: string;
    year: number;
    type: string;
};

const MovieResultCard: React.FC<MovieResultCardProps> = ({
    id,
    title,
    year,
    type,

}) => {

    const getMovieDetails = async () => {
        try {
            const response = await axios.post('/api/search_movie_details', { movieId: id });
            console.log("Movie details response: ", response.data);
        } catch (error) {
            console.error("Error fetching movie details: ", error);
        }
    };

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Button variant="outline-info" className="mb-3" onClick={getMovieDetails}>
                    ➕ Show Details
                </Button>
                <div>
                    <p><strong>Year:</strong> {year}</p>
                </div>
            </Card.Body>
        </Card>
    );
};

export default MovieResultCard