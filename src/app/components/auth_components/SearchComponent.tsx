"use client";

// Component to search movie titles, display results, and allow users to add movies to their watchlist
import React, { useState } from 'react';
// Auth context
import { useAuthContext } from '@/app/context/AuthContext';
// Bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// 
import axios from 'axios';
//
import MovieCard from './movie_components/MovieCard';


// Define the structure of the movie information we want to return
type MovieCardProps = {
    id: number;
    title: string;
    year: string;
    posterUrl: string;
    rating: string;
    imdbRating: number;
    genres: string[];
    director: string[];
    cast: string[];
    summary: string;
    streamingOn: string[];
    runtime?: number;
};

// Search component for finding movies
const SearchComponent: React.FC<{}> = () => {

    // local state for search query
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState<MovieCardProps[]>([]);

    // search function to call the search api route
    const searchForMovie = async (query: string) => {
        try {
            console.log("Searching for movie:", query);
            const response = await axios.post('/api/search', { query });
            setMovies(response.data);
        } catch (error) {
            console.error("Error searching for movie:", error);
            return null;
        }
    };

    // function to handle search button click
    const handleSearchButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("Searching for:", query);
        await searchForMovie(query);
        setQuery('');
    };

    // function to handle form input changes
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        console.log("Current query:", query);
    };

    return (
        <>
            <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="🔍 Search by movie title"
                    className="me-2"
                    aria-label="Search"
                    value={query}
                    onChange={handleFormChange}
                />
                <Button onClick={handleSearchButtonClick} variant="outline-success">Search</Button>
            </Form>

            {movies && movies.map(movie => <MovieCard key={movie.id} {...movie} />)}
        </>
    );
};

export default SearchComponent;