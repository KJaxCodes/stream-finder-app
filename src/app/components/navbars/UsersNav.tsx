"use client";
import React, { useEffect } from "react";
// AuthContext and MoviesContext
import { useAuthContext } from "@/app/context/AuthContext";
import { useMoviesContext } from "@/app/context/movies/MoviesContext";
//next
import Link from "next/link";
import { useRouter } from "next/navigation";
// React Bootstrap
import Button from "react-bootstrap/Button";
//styles
import styles from "../../page.module.css";

// UsersNav component

const UsersNav: React.FC<{}> = () => {
    const { user, dispatchLogout } = useAuthContext();
    const { dispatchFetchWatchlist } = useMoviesContext();
    const router = useRouter();

    const handleLogout = async () => {
        const success = await dispatchLogout();
        if (!success) {
            // todo - show error message to user
            console.error("Logout failed");
        }
        // navigate to unauthorized landing page
        router.push("/");
    };

    // Fetch watchlist when user logs in
    useEffect(() => {
        if (user) {
            console.log("From UsersNav, Fetching watchlist for user:", user.email);
            dispatchFetchWatchlist(user.id);
        }
    }, [user, dispatchFetchWatchlist]);

    return (
        <nav className={styles.navLinks}>
            {user ? (
                <>
                    <Link href="/profile">
                        Profile
                    </Link>
                    <Link href="/search">
                        Search
                    </Link>
                    <Button color="danger" onClick={handleLogout}>Log Out</Button>

                </>
            ) : (
                null
            )
            }
        </nav>
    );
}

export default UsersNav;