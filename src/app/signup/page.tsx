//from frontend need to grab data and send to backend to create user
//then backend will create user
//then frontend will redirect to login page
//then user can login with the token
//then frontend will store the token in local storage - local storage?
//then frontend will redirect to home page
//then user can access protected routes with the token

//use client directive is needed to use useState and useEffect
"use client";
//import necessary libraries and components
import Link from "next/link"; //link is used to navigate between pages
import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; //useRouter is used to navigate between pages programmatically
import axios from "axios"; //axios is used to make API calls


export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    });

    // State to manage button disabled status
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    // State to manage loading and error messages
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    // Function to handle signup

    const onSignup = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.post('/api/users/signup', user)
            console.log("Signup success:", response.data);
            router.push('/login');
        } catch (error: any) {
            console.log("Error during signup:", error);
            setError(error.response?.data?.message || 'An error occurred during signup');

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div>
            <h1>{loading ? "Processing..." : "Signup Page"}</h1>
            <br />
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter your email"
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Enter your password"
            />
            <br />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <br />

            <button onClick={onSignup}>{buttonDisabled ? "" : "Signup"}</button>
            <br />
            <Link href="/login">Already have an account? Visit Login Page</Link>
        </div>
    );
}
