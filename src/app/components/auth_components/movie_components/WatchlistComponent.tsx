// component to display user's watchlist within their profile
"use client";
import React, { useEffect } from "react";

//
import { useAuthContext } from "@/app/context/AuthContext";
import { useMoviesContext } from "@/app/context/MoviesContext";
import Card from "react-bootstrap/Card";

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
        if (user && user._id) {
            dispatchFetchWatchlist(user._id);
        }
    }, [user, dispatchFetchWatchlist]);

    console.log("userId in WatchlistComponent: ", user._id);
    console.log("user: ", user);

    return (
        <div className="mt-4">
            <h3>Your Watchlist</h3>
            {[{ objectId: "11111", title: "Sample Movie" }].map(({ objectId, title }) => (
                <Card key={objectId} className="mb-3">
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>Movie ID: {objectId}</Card.Text>
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
