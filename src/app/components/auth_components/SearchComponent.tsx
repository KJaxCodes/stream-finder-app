"use client";
// Component to search movie titles, display results, and allow users to add movies to their watchlist
import React, { useState, useEffect } from 'react';
// Movies context
import { useMoviesContext } from '../../context/movies/MoviesContext';
// Bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// additional components
import MovieDetailsModal from '@/app/components/movie_components/MovieDetailsModal';
import MovieResultCard from '@/app/components/movie_components/MovieResultCard';
// types


// Search component for finding movies
const SearchComponent: React.FC<{}> = () => {

    // local state for search query
    const [query, setQuery] = useState('');
    const { searchResults, dispatchSearch } = useMoviesContext();


    // function to handle search button click, then clear the search input
    const handleSearchButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await dispatchSearch(query);
        setQuery('');
        console.log('Search results:', searchResults);
    };


    // function to handle form input changes
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
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
            <MovieDetailsModal />
            {searchResults && searchResults.length > 0 ? (
                searchResults.map(movie => <MovieResultCard key={movie.id} {...movie} />)
            ) : (
                <p className="mt-4 bg-warning p-3 rounded">No movies found. Try another search.</p>
            )}
        </>
    );
};

export default SearchComponent;