
// React imports
import React from "react";
// additional components
import InitialNav from "./components/navbars/InitialNav";
// styles
import styles from "./page.module.css";


// Landing page for unauthenticated users

export default function LandingPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <InitialNav />
        <h1>Welcome to Streamfinder</h1>
        <p>Your ultimate destination to find where to stream your favorite movies.</p>
        <ul>
          <li>Sign up and log in to your account.</li>
          <li>Search for movies and where to stream them.</li>
          <li>Save your favorite movies to your Watchlist.</li>
          <li>View and edit your Watchlist from your Profile</li>
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

