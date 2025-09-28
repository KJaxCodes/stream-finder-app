// React imports
import React from "react";
// React bootstrap imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// Additional Components
import LoginComponent from "../components/auth_components/LoginComponent";


export default function LoginPage() {
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
