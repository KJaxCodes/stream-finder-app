// component to display user's watchlist within their profile
"use client";
import React, { useEffect } from "react";

//
import { useAuthContext } from "@/app/context/AuthContext";
import { useMoviesContext } from "@/app/context/MoviesContext";

//
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";



const WatchlistComponent: React.FC = () => {
    const { dispatchFetchWatchlist, watchlist } = useMoviesContext();
    const { user } = useAuthContext();

    // React.useEffect(() => {
    //     dispatchFetchWatchlist();
    // }, [dispatchFetchWatchlist]);

    // if (!watchlist || watchlist.length === 0) {
    //     return <p className="mt-4">Your watchlist is empty. Add some movies to get started!</p>;
    // }


    useEffect(() => {
        if (user && user.id) {
            dispatchFetchWatchlist(user.id);
            console.log("Fetching watchlist for user ID: ", user.id);
        }
    }, [user]);

    console.log("user: ", user);

    // Display user's email name in title, capitalize first letter, fallback to 'User' if email not available
    return (
        <div className="mt-4">

            <h3>Your Watchlist</h3>
            {watchlist.map(({ objectId, posterURL, title, year, summary, streamingOn }) => (
                <Card key={objectId} className="mb-3">
                    <Card.Body>
                        <Row>
                            {/* Thumbnail image */}
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
                                <Button variant="outline-danger" size="sm">Delete</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};


export default WatchlistComponent;






//     return (
//         <div className="mt-4">
//             <h3>Your Watchlist</h3>
//             {watchlist.map(({ objectId, title }) => (
//                 <Card key={objectId} className="mb-3">
//                     <Card.Body>
//                         <Card.Title>{title}</Card.Title>
//                         <Card.Text>Movie ID: {objectId}</Card.Text>
//                     </Card.Body>
//                 </Card>
//             ))}
//         </div>
//     );
// };

