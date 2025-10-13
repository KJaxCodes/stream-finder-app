import React from 'react';
/// Bootstrap components
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
// MoviesContext  
import { useMoviesContext } from '@/app/context/MoviesContext'; 
import { MovieDetailsData } from '@/app/types/shared/types';

interface IMovieDetailsModalProps {
    // Define any props you might need here
};

const MovieDetailsModal: React.FC<IMovieDetailsModalProps> = ({ }) => {
    // grab movie details from context or props as needed
    const { currentMovie, dispatchClearCurrentMovie } = useMoviesContext();

    if (!currentMovie) {
        return null; // don't render the modal if no movie is selected
    }

    const {
        title, summary, runtime, year, imdbRating, genres, rating, posterURL, director, cast, streamingOn
    } = currentMovie;

    const handleModalClose = () => {
        dispatchClearCurrentMovie();
    };

    console.log("Rendering MovieDetailsModal for movie:", currentMovie);

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

                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {/* Add to watchlist logic here */}}>
                        Add to Watchlist
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MovieDetailsModal;