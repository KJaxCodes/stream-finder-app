"use client";
// AuthContext
import { useAuthContext } from '@/app/context/AuthContext';
// Next
import Link from 'next/link';
// styles
import styles from '../../page.module.css';
import { useEffect } from 'react';

// UsersNav component

const UsersNav: React.FC<{}> = () => {
    const { user } = useAuthContext();

    useEffect(() => {
        // Perform any side effects or logging here
        console.log("User state changed:", user);
    }, [user]);

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
                    <Link href="/logout">
                        Logout
                    </Link>
                </>
            ) : (
                null
            )}
        </nav>
    );
}

export default UsersNav;