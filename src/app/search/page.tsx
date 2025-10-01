// React imports
import React from "react";
// React bootstrap imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// Additional Components
import SearchComponent from "../components/auth_components/SearchComponent";

export default function SearchPage() {
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



