"use client";

// Component to search movie titles, display results, and allow users to add movies to their watchlist
import React, { useState } from 'react';
// Auth context
import { useAuthContext } from '@/app/context/AuthContext';
// Bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {

}

const SearchComponent: React.FC<{}> = () => {
    return (
        <Form className="d-flex">
            <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value=""
                onChange={handleFormChange}
            />
            <Button variant="outline-success">Search</Button>
        </Form>
    );
}

export default SearchComponent;