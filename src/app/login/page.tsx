//use client directive is needed to use useState and useEffect
"use client";
//import necessary libraries and components
import Link from "next/link"; //link is used to navigate between pages
import React from "react";
import { useRouter } from "next/navigation"; //useRouter is used to navigate between pages programmatically
import axios from "axios"; //axios is used to make API calls


export default function LoginPage() {
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    });

    const onLogin = async () => {
        console.log("Login button clicked");
    }

    return (
        <div>
            <h1>Login Page</h1>
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
            <button onClick={onLogin}>Login</button>
            <br />
            <Link href="/signup">Don't have an account? Visit Signup Page</Link>
        </div>
    );
}
