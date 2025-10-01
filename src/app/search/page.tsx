// React imports
import React from "react";
//
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
// React bootstrap imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// Additional Components
import SearchComponent from "../components/auth_components/SearchComponent";

export default async function SearchPage() {
    // Get cookies from the request
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    // If no token is found, redirect to the login page
    if (!token) {
        redirect('/login');
    }

    // TODO: check if token is valid

    return (
        <div>
            <h1>Search Page</h1>
            <Row>
                <Col>
                    <SearchComponent />
                </Col>
            </Row>
        </div>
    );
}



