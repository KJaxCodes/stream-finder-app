// React imports
import React from "react";
// additional components
import UsersNav from "../components/navbars/UsersNav";
// auth helpers 
import { runProtectedRoute } from "../api/users/helpers/authHelpers";
// styles
import styles from "../page.module.css";




export default async function Home() {
    await runProtectedRoute();

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