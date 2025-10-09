"use client";
// AuthContext
import { useAuthContext } from '@/app/context/AuthContext';
// Next
import Link from 'next/link';
// styles
import styles from '../../page.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';


// UsersNav component

const UsersNav: React.FC<{}> = () => {
    const { user, dispatchLogout } = useAuthContext();

    const router = useRouter();

    const handleLogoutButtonClick = async () => {
        if (await dispatchLogout()) {
            return router.push('/login');
        }
        console.log("Logout failed");
        // handle logout error component
    }

    useEffect(() => {
        // Perform any side effects or logging here
        console.log("UsersNav comoponent. User state changed:", user);
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
                    <Button variant="secondary" onClick={handleLogoutButtonClick}>Logout</Button>
                </>
            ) : (
                null
            )}
        </nav>
    );
}

export default UsersNav;