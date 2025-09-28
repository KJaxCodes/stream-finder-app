//
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
// React imports
import React from "react";
// additional components
import UsersNav from "../components/navbars/UsersNav";
// styles
import styles from "../page.module.css";




export default async function Home() {

    // Get cookies from the request
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    // If no token is found, redirect to the login page
    if (!token) {
        redirect('/login');
    }

    // TODO: check if token is valid

    // const isLoggedIn = !!token;


    //logout should refresh the page to update the nav links
    // should logout be a button that calls an action to logout and then refresh the page?

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <UsersNav />
                <h1>Streamfinder Homepage for Logged In Users Only</h1>
                <ul>
                    <li>Sign up and log in to your account.</li>
                    <li>View and edit your profile information.</li>
                    <li>Search for movies and where to stream them.</li>
                    <li>Save your favorite movies to your watchlist.</li>
                </ul>
            </main>
            <footer className={styles.footer}>
                <a
                    href="https://www.watchmode.com"
                >
                    Streaming data powered by Watchmode.com
                </a>
            </footer>
        </div>
    );
}
