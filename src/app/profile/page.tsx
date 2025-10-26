// React imports
import React from "react";
// React bootstrap imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// Additional Components
import UsersNav from "../components/navbars/UsersNav";
import WatchlistComponent from "../components/movie_components/WatchlistComponent";
// auth helpers 
import { runProtectedRoute } from "../api/helpers/authHelpers";
// styles
import styles from "../page.module.css";


export default async function Profile() {
    await runProtectedRoute();

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <UsersNav />
                <h1>Profile</h1>
                <p>Review and edit your Watchlist here.</p>
                <Row>
                    <Col>
                        <WatchlistComponent />
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

