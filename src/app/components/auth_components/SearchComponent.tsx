"use client";

// Component to search movie titles, display results, and allow users to add movies to their watchlist
import React, { useState } from 'react';
// Auth context
import { useAuthContext } from '@/app/context/AuthContext';
// Bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// axios
import axios from 'axios';
// types
import MovieResultCard from './movie_components/MovieResultCard';
import type { MovieResultCardProps } from './movie_components/MovieResultCard';


// Search component for finding movies
const SearchComponent: React.FC<{}> = () => {

    // local state for search query
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState<MovieResultCardProps[]>([]);

    // search function to call the search api route
    const searchForMovie = async (query: string) => {
        try {
            console.log("Searching for movie:", query);
            const response = await axios.post('/api/search', { query });
            setMovies(response.data);
            console.log("Search results:", response.data);
        } catch (error) {
            console.error("Error searching for movie:", error);
            setMovies([]);
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

            {movies && movies.map(movie => <MovieResultCard key={movie.id} {...movie} />)}
        </>
    );
};

export default SearchComponent;