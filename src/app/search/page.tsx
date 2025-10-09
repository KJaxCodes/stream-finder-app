// React imports
import React from "react";
// React bootstrap imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// Additional Components
import SearchComponent from "../components/auth_components/SearchComponent";
import UsersNav from "../components/navbars/UsersNav";
// Auth helpers
import { runProtectedRoute } from "../api/users/helpers/authHelpers";
// styles
import styles from "../page.module.css";

export default async function SearchPage() {
    // Protect this route, redirect to login if not authenticated
    // This runs on the server side
    // No client side code is run here
    await runProtectedRoute();

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


