// React imports
import React from "react";
// React bootstrap imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// auth helpers
import { redirectIfAuthenticated } from "../api/users/helpers/authHelpers";
// Additional Components
import SignupComponent from "../components/auth_components/SignupComponent";


//from frontend need to grab data and send to backend to create user
//then backend will create user
//then frontend will redirect to login page
//then user can login with the token
//then frontend will store the token in cookies
//then frontend will redirect to home page
//then user can access protected routes with the token

export default function SignupPage() {
    // If user is already authenticated, redirect to home page
    redirectIfAuthenticated();

    // Render signup component
    return (
        <>
            <Row className="justify-content-md-center">
                <Col xs lg="12" style={{ textAlign: 'center' }}>
                    <h1>Signup</h1>
                </Col>
            </Row>
            <Row className="justify-content-md-center">

                <Col xs lg="2">

                </Col>
                <Col md="auto">
                    <SignupComponent />
                </Col>
                <Col xs lg="2">
                </Col>
            </Row>
        </>
    );
}
