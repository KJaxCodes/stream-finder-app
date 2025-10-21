"use client";
// AuthConext
import { useAuthContext } from "@/app/context/AuthContext";
//next
import Link from "next/link";
import {useRouter} from "next/navigation";
// React Bootstrap
import Button from "react-bootstrap/Button";
//styles
import styles from "../../page.module.css";

// UsersNav component

const UsersNav: React.FC<{}> = () => {
    const { user, dispatchLogout } = useAuthContext();
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