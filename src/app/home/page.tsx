//use client directive is needed to use useState and useEffect
"use client";
//import necessary libraries and components
import styles from "./page.module.css";
import Link from "next/link";
import { cookies } from 'next/headers';



export default async function Home() {

    // Get cookies from the request
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const isLoggedIn = !!token;


    //logout should refresh the page to update the nav links
    // should logout be a button that calls an action to logout and then refresh the page?

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1>Streamfinder</h1>
                <nav className={styles.navLinks}>
                    {!isLoggedIn ? (
                        <>
                            <Link href="/signup">
                                Sign Up
                            </Link>
                            <Link href="/login">
                                Log In
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/profile">
                                Profile
                            </Link>
                            <Link href="/search">
                                Search
                            </Link>
                        </>

                    )}

                </nav>
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
