// React imports
import React from "react";
//
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
// React bootstrap imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// Additional Components
import MovieCard from "../components/movie_components/MovieDetailsCard";


export default function ResultsPage() {
    return (
        <div>
            <h1>Search Results</h1>
            <Row>
                <Col>
                    <MovieCard title={""} posterUrl={""} year={""} rating={""} imdbRating={0} genres={[]} director={[]} cast={[]} summary={""} streamingOn={[]} />
                </Col>
            </Row>
        </div>
    );
}


