//
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
// React imports
import React from "react";
// React bootstrap imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// Additional Components
import SearchComponent from "../components/auth_components/SearchComponent";
import UsersNav from "../components/navbars/UsersNav";
// styles
import styles from "../page.module.css";

export default async function SearchPage() {
    // Get cookies from the request
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    // If no token is found, redirect to the login page
    if (!token) {
        redirect('/login');
    }

    // TODO: check if token is valid

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <UsersNav />
                <h1>Search Page For Logged In Users</h1>
                <Row>
                    <Col>
                        <SearchComponent />
                    </Col>
                </Row>
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


