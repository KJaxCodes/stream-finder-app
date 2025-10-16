// React imports
import React from "react";
// React bootstrap imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// Additional Components
import UsersNav from "../components/navbars/UsersNav";
// auth helpers 
import { runProtectedRoute } from "../api/users/helpers/authHelpers";
// styles
import styles from "../page.module.css";


export default async function Profile() {
    await runProtectedRoute();

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <UsersNav />
                <h1>Profile</h1>
                <p>Welcome to your profile page.</p>
                <Row>
                    <Col>
                        <h3>Check out your Watchlist</h3>
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
};

