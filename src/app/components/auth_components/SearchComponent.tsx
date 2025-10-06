"use client";

// Component to search movie titles, display results, and allow users to add movies to their watchlist
import React, { useState } from 'react';
import { searchMovie, BasicMovieInfo } from './movie_components/watchmode';
// Auth context
import { useAuthContext } from '@/app/context/AuthContext';
// Bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
// 
import axios from 'axios';

// Function to call the search API route

const searchForMovie = async (query: string) => {
    try {
        console.log("Searching for movie:", query);
        const response = await axios.post('/api/search', { query });
        console.log("Search response:", response.data);
        // maybe here set the movie context state
        return response.data;
    } catch (error) {
        console.error("Error searching for movie:", error);
        return null;
    }
}

// Main Search Component

const SearchComponent: React.FC<{}> = () => {

    // local state for search query
    const [query, setQuery] = useState('');
    // const [movie, setMovie] = useState<BasicMovieInfo | null>(null);

    // Function to handle form input changes
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        console.log("Current query:", query);
    }

    // Function to handle search button click
    const handleSearchButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("Searching for:", query);
        // Implement search functionality here
        const result = await searchForMovie(query);
        // if (result) {
        //     setMovie(result);
        //     console.log("Search result:", result);
        // } else {
        //     console.log("No results found");
        //     setMovie(null);
        // }

        // Reset query after search
        setQuery('');
    }

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

            {/* {movie && (
                <div className="mt-4">
                    <h4>{movie.title} ({movie.year})</h4>
                    <Image src={movie.posterUrl} alt={movie.title} rounded style={{ width: '100px', height: '150px', objectFit: 'cover' }} />
                </div>
            )} */}
        </>
    );
};

export default SearchComponent;