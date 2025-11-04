// component to display user's watchlist within their profile
"use client";
import React, { useEffect } from "react";
import Image from 'next/image'
//
import { useAuthContext } from "@/app/context/AuthContext";
import { useMoviesContext } from "@/app/context/movies/MoviesContext";
// React Bootstrap components
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const WatchlistComponent: React.FC = () => {
    const { dispatchFetchWatchlist, dispatchRemoveFromWatchlist, watchlist } = useMoviesContext();
    const { user } = useAuthContext();


    const handleRemoveFromWatchlist = async (movieId: string) => {
        // console.log("Remove from watchlist clicked for movieId:", movieId);
        // console.log("User info:", user);
        if (user && user.id) {
            await dispatchRemoveFromWatchlist(user.id, movieId);
        }
    };

    useEffect(() => {
        if (user && user.id) {
            dispatchFetchWatchlist();
            //console.log("Fetching watchlist for user:", user.email);
        }
        // handleDispatchFetchWatchlist();
        //console.log("WatchlistComponent mounted or user changed.", user);
    }, [user, dispatchFetchWatchlist]);

    // early return if watchlist is empty
    if (watchlist.length === 0) {
        return <p>Your watchlist is empty. Start adding some movies!</p>;
    }

    return (
        <div className="mt-4">
            <h3>Your Watchlist</h3>
            {
                watchlist.map(({ objectId, posterURL, title, year, summary, streamingOn }) => (
                    <Card key={objectId} className="mb-3">
                        <Card.Body>
                            <Row>
                                {/* Thumbnail image */}
                                <Col xs={4} md={3}>
                                    <Image
                                        src={posterURL}
                                        alt={title}
                                        width={300} // base width
                                        height={450} // maintains 2:3 aspect ratio
                                        style={{
                                            maxWidth: "80%",
                                            height: "auto",
                                            objectFit: "cover",
                                            borderRadius: "6px"
                                        }}
                                    />
                                </Col>

                                {/* Movie details */}
                                <Col xs={8} md={9}>
                                    <Card.Title>{title} ({year})</Card.Title>
                                    <Card.Text style={{ fontSize: "0.9rem" }}>{summary}</Card.Text>
                                    <Card.Text>
                                        <strong>Streaming on:</strong>{" "}
                                        {streamingOn.length > 0 ? streamingOn.join(", ") : "Not available"}
                                    </Card.Text>
                                    <Button variant="outline-danger" size="sm" onClick={() => { handleRemoveFromWatchlist(objectId) }}>Delete</Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                ))
            }
        </div>
    );
};

export default WatchlistComponent;