//use client directive is needed to use useState and useEffect
"use client";
//import necessary libraries and components
import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; //useRouter is used to navigate between pages programmatically
import axios from "axios"; //axios is used to make API calls
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoginComponent from "../components/auth_components/LoginComponent";


export default function LoginPage() {
    const router = useRouter();
   
    // State to manage button disabled status
    // const [buttonDisabled, setButtonDisabled] = React.useState(false);
    // State to manage loading and error messages
    // const [loading, setLoading] = React.useState(false);
    // const [error, setError] = React.useState<string | null>(null);

    // const onLogin = async () => {
    //     try {
    //         setLoading(true);
    //         const response = await axios.post('/api/users/login', user);
    //         console.log("Login success:", response.data);
    //         router.push('/');
    //     } catch (error: any) {
    //         console.log("Error during login:", error);
    //         setError(error.response?.data?.message || 'An error occurred during login');
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    // useEffect(() => {
    //     if (user.email.length > 0 && user.password.length > 0) {
    //         setButtonDisabled(false);
    //     } else {
    //         setButtonDisabled(true);
    //     }
    // }, [user]);

    return (
        <>
            <Row className="justify-content-md-center">
                <Col xs lg="12">
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
        // <div>
        //     <h1>{loading ? 'Processing...' : 'Login Page'}</h1>
        //     <br />
        //     <label htmlFor="email">Email:</label>
        //     <input
        //         type="email"
        //         id="email"
        //         value={user.email}
        //         onChange={(e) => setUser({ ...user, email: e.target.value })}
        //         placeholder="Enter your email"
        //     />
        //     <br />
        //     <label htmlFor="password">Password:</label>
        //     <input
        //         type="password"
        //         id="password"
        //         value={user.password}
        //         onChange={(e) => setUser({ ...user, password: e.target.value })}
        //         placeholder="Enter your password"
        //     />
        //     <br />
        //     <button onClick={onLogin}>{buttonDisabled ? "" : "Login"}</button>
        //     <br />
        //     <Link href="/signup">Don't have an account? Visit Signup Page</Link>
        // </div>
    );
}
