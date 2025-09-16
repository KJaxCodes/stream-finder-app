//from frontend need to grab data and send to backend to create user
//then backend will create user and send back a token
//frontend will store the token in local storage - local storage?
//then frontend will redirect to login page
//then user can login with the token
//then frontend will store the token in local storage - local storage?
//then frontend will redirect to home page
//then user can access protected routes with the token

//use client directive is needed to use useState and useEffect
"use client";
//import necessary libraries and components
import Link from "next/link"; //link is used to navigate between pages
import React from "react";
import { useRouter } from "next/navigation"; //useRouter is used to navigate between pages programmatically
import axios from "axios"; //axios is used to make API calls


export default function SignupPage() {
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    });

    const onSignup = async () => {
        console.log("Signup button clicked");
    }

    return (
        <div>
            <h1>Signup Page</h1>
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
            <button onClick={onSignup}>Signup</button>
            <br />
            <Link href="/login">Already have an account? Visit Login Page</Link>
        </div>
    );
}
