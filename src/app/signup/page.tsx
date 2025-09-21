//use client directive is needed to use useState and useEffect
"use client";
// React imports
import React, { useEffect } from "react";
// Next.js imports
import Link from "next/link"; //link is used to navigate between pages
import { useRouter } from "next/navigation"; //useRouter is used to navigate between pages programmatically
// React bootstrap imports
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// Auth Context
import { useAuthContext } from "../context/AuthContext";
// Additional Components
import SignupComponent from "../components/auth_components/SignupComponent";
// Axios import
import axios from "axios"; //axios is used to make API calls
import { Sign } from "crypto";


//from frontend need to grab data and send to backend to create user
//then backend will create user
//then frontend will redirect to login page
//then user can login with the token
//then frontend will store the token in cookies
//then frontend will redirect to home page
//then user can access protected routes with the token

export default function SignupPage() {
    const router = useRouter();

    // State to manage button disabled status
    //const [buttonDisabled, setButtonDisabled] = React.useState(false);
    // State to manage loading and error messages
    // const [loading, setLoading] = React.useState(false);
    // const [error, setError] = React.useState<string | null>(null);



    // useEffect(() => {
    //     if (formState.email.length > 0 && formState.password.length > 0) {
    //         setButtonDisabled(false);
    //     } else {
    //         setButtonDisabled(true);
    //     }
    // }, [formState]);

    // useEffect(() => {
    //     console.log(`User: ${user}, Loading: ${loading}, Error: ${error}`);
    // }, [user, loading, error]);



    return (
        <>
            <Row className="justify-content-md-center">
                <Col xs lg="12">
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
        //     <div>
        //         <h1>{loading ? "Processing..." : "Signup Page"}</h1>
        //         <SignupComponent />

        //         <Link href="/login">Already have an account? Visit Login Page</Link>
        //     </div>
    );
}
