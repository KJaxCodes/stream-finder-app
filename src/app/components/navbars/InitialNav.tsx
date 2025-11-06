"use client";
// AuthConext
import { useAuthContext } from "@/app/context/AuthContext";
//next
import Link from "next/link";
import { useRouter } from 'next/navigation';
//styles
import styles from "../../page.module.css";


// InitialNav component for unauthenticated users, links to signup and login

const InitialNav: React.FC = () => {
    const { user } = useAuthContext();
    const router = useRouter();

    if (user) {
        // If user is logged in, redirect to home page for logged in users
        router.push("/home");
        return null;
    };

    return (
        <nav className={styles.navLinks}>
            <Link href="/signup">
                Sign Up
            </Link>
            <Link href="/login">
                Log In
            </Link>
        </nav>
    );
};

export default InitialNav;