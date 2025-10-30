import React from 'react';
/// Bootstrap components
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
// AuthContext
import { useAuthContext } from '@/app/context/AuthContext';
// MoviesContext  
import { useMoviesContext } from '@/app/context/movies/MoviesContext';
// Types
import type { WatchlistMovieData } from '@/app/types/shared/types';
import { moviesReducer } from '@/app/context/movies/moviesReducer';

interface IMovieDetailsModalProps {
    // Define any props you might need here
};

// function to check if currentMovie is in watchlist
const isInWatchlist = (watchlist: WatchlistMovieData[], watchmodeMovieId: number): boolean => {
    return watchlist.some(movie => movie.watchmodeId === watchmodeMovieId);
}

const MovieDetailsModal: React.FC<IMovieDetailsModalProps> = ({ }) => {
    // grab movie details from context or props as needed
    const { currentMovie, dispatchAddToWatchlist, dispatchClearCurrentMovie, dispatchRemoveFromWatchlist, watchlist } = useMoviesContext();
    const { user } = useAuthContext();

    // If no current movie is selected or user is not logged in, don't render the modal
    if (!currentMovie || !user) {
        return null;
    }

    // Destructure movie details
    const {
        title, summary, runtime, year, imdbRating, genres, rating, posterURL, director, cast, streamingOn
    } = currentMovie;

    // Handler to add movie to watchlist, pass userId and currentMovie
    const handleAddToWatchlist = async () => {
        const { id: userId } = user;
        await dispatchAddToWatchlist(userId, currentMovie);
    };

    // Handler to remove movie from watchlist
    const handleRemoveFromWatchlist = () => {
        if (user && user.id) {
            // find the movie in watchlist by matching watchmodeId
            const match = watchlist.find(movie => movie.watchmodeId === currentMovie.id);
            // if found, dispatch remove action with its objectId
            if (match) {
                dispatchRemoveFromWatchlist(user.id, match.objectId);
            } else {
                console.warn("Movie not found in watchlist for removal.");
            }
        }
    };

    // Handler to close modal
    const handleModalClose = () => {
        dispatchClearCurrentMovie();
    };

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
                                <img src={posterURL} alt={`${title} poster`} className="img-fluid mb-3" />
                            </Col>
                        </Row>
                    </Container>


                </Modal.Body>
                <Modal.Footer>
                    {
                        isInWatchlist(watchlist, currentMovie.id) ?
                            <Button variant="danger" onClick={handleRemoveFromWatchlist}>
                                Remove from Watchlist
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