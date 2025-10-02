"use client";

// Component to search movie titles, display results, and allow users to add movies to their watchlist
import React, { useState } from 'react';
// Auth context
import { useAuthContext } from '@/app/context/AuthContext';
// Bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



const SearchComponent: React.FC<{}> = () => {

    // local state for search query
    const [query, setQuery] = useState('');

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

        // Reset query after search
        setQuery('');
    }

    return (
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
    );
}

export default SearchComponent;