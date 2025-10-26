// React imports
import React from "react";
// React bootstrap imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// auth helpers
import { redirectIfAuthenticated } from "../api/helpers/authHelpers";
// Additional Components
import LoginComponent from "../components/auth_components/LoginComponent";


export default async function LoginPage() {
    // If user is already authenticated, redirect to home page
    await redirectIfAuthenticated();

    // Render login component
    return (
        <>
            <Row className="justify-content-md-center">
                <Col xs lg="12" style={{ textAlign: 'center' }}>
                    <h1>Login</h1>
                </Col>
            </Row>
            <Row className="justify-content-md-center">

                <Col xs lg="2">

                </Col>
                <Col md="auto">
                    <LoginComponent />
                </Col>
                <Col xs lg="2">
                </Col>
            </Row>
        </>
    );
}
