import React from 'react';
import Image from 'next/image'
/// Bootstrap components
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
// AuthContext
import { useAuthContext } from "../../context/AuthContext";
// MoviesContext  
import { useMoviesContext } from "../../context/movies/MoviesContext";
// types
import type { WatchlistMovieData } from '@/app/types/shared/types';

// for now no props


// function to check if currentMovie is in watchlist
const isInWatchlist = (watchlist: WatchlistMovieData[], watchmodeMovieId: number): boolean => {
    return watchlist.some(movie => movie.watchmodeId === watchmodeMovieId);
}

const MovieDetailsModal: React.FC = () => {
    // grab movie details from context or props as needed
    const { currentMovie, dispatchAddToWatchlist, dispatchClearCurrentMovie, dispatchRemoveFromWatchlist, watchlist } = useMoviesContext();
    const { user } = useAuthContext();

    if (!currentMovie || !user) {
        return null; // don't render the modal if no movie is selected
    }

    const {
        title, summary, runtime, year, imdbRating, genres, rating, posterURL, director, cast, streamingOn
    } = currentMovie;


    const handleAddToWatchlist = async () => {
        const { id: userId } = user;
        await dispatchAddToWatchlist(userId, currentMovie);
    };

    // const handleRemoveFromWatchlist = async () => {
    //     const { id: userId } = user;
    //     await dispatchRemoveFromWatchlist(userId, String(currentMovie.id));
    // };


    const handleModalClose = () => {
        dispatchClearCurrentMovie();
    };


    //console.log("Rendering MovieDetailsModal for movie:", currentMovie);

    return (
        <>
            <Modal show={currentMovie ? true : false} onHide={handleModalClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Movie Details for: {title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col s={12} md={6}>
                                <h5>Summary:</h5>
                                <p>{summary}</p>
                                <h5>Details:</h5>
                                <ul>
                                    <li><strong>Runtime:</strong> {runtime} minutes</li>
                                    <li><strong>Year:</strong> {year}</li>
                                    <li><strong>IMDb Rating:</strong> {imdbRating}</li>
                                    <li><strong>Genres:</strong> {genres.join(', ')}</li>
                                    <li><strong>Rating:</strong> {rating}</li>
                                    <li><strong>Director:</strong> {director}</li>
                                    <li><strong>Cast:</strong> {cast.join(', ')}</li>
                                    <li><strong>Streaming On:</strong> {streamingOn.join(', ')}</li>
                                </ul>
                            </Col>
                            <Col xs={12} md={6}>
                                <Image src={posterURL} alt={`${title} poster`} className="img-fluid mb-3" width={300} height={450} />
                            </Col>
                        </Row>
                    </Container>


                </Modal.Body>
                <Modal.Footer>
                    {
                        isInWatchlist(watchlist, currentMovie.id) ?
                            <Button variant="danger">
                                Already in Watchlist
                            </Button>
                            :
                            <Button variant="primary" onClick={handleAddToWatchlist}>
                                ❤️ Add to Watchlist
                            </Button>
                    }
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MovieDetailsModal;