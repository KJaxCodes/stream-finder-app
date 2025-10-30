// component to display user's watchlist within their profile
"use client";
import React, { useEffect } from "react";

//
import { useAuthContext } from "@/app/context/AuthContext";
import { useMoviesContext } from "@/app/context/movies/MoviesContext";
// React Bootstrap imports
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const WatchlistComponent: React.FC = () => {
    const { dispatchFetchWatchlist, dispatchRemoveFromWatchlist, watchlist } = useMoviesContext();
    const { user } = useAuthContext();

    // dispatchFetchWatchlist is a volatile function, so we include it in the dependency array
    useEffect(() => {
        if (user && user.id) {
            dispatchFetchWatchlist();
            console.log("In WatchlistComponent,Fetching watchlist for user:", user.email);
        }
        // HandleDispatchFetchWatchlist();
        console.log("WatchlistComponent mounted or user changed.", user);
    }, [user, dispatchFetchWatchlist]);

    // Handle case where watchlist is empty
    if (watchlist.length === 0) {
        return <p>Your watchlist is empty. Start adding some movies!</p>;
    }

    // Handler to remove movie from watchlist
    const handleRemoveFromWatchlist = (movieId: string) => {
        if (user && user.id) {
            dispatchRemoveFromWatchlist(user.id, movieId);
        }
    };

    return (
        <div className="mt-4">

            <h3>Your Watchlist</h3>
            {
                watchlist.map(({ objectId, posterURL, title, year, summary, streamingOn }) => (
                    <Card key={objectId} className="mb-3">
                        <Card.Body>
                            <Row>
                                {/* Responsive image */}
                                <Col xs={4} md={3}>
                                    <img
                                        src={posterURL}
                                        alt={title}
                                        style={{
                                            width: "80%",
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
                                    <Button variant="outline-danger" size="sm" onClick={() => handleRemoveFromWatchlist(objectId)}>Delete</Button>
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