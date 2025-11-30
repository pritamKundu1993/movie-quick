import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import MovieDetailsInfo from '../components/MovieDetailsInfo';
import ChooseMovieDate from '../components/ChooseMovieDate';
import SimilarMovies from '../components/SimilarMovies';
import { API_OPTIONS, BACKGROUND_VIDEO_BASE_API_URL } from '../utils/constants';
import LoadingComponents from '../components/LoadingComponents';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        fetchMovieDetails();
        fetchMovieVideos();
        fetchSimilarMovies();
    }, [id]);

    const fetchMovieDetails = async () => {
        try {
            const response = await fetch(
                `${BACKGROUND_VIDEO_BASE_API_URL}/movie/${id}?language=en-US&append_to_response=credits`,
                API_OPTIONS
            );
            const data = await response.json();

            setMovie(data);
            setCast(data.credits?.cast?.slice(0, 10) || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching movie details:', error);
            setLoading(false);
        }
    };

    const fetchMovieVideos = async () => {
        try {
            const response = await fetch(
                `${BACKGROUND_VIDEO_BASE_API_URL}/movie/${id}/videos?language=en-US`,
                API_OPTIONS
            );
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const officialTrailer = data.results.find(
                    (video) =>
                        video.type === 'Trailer' &&
                        video.site === 'YouTube' &&
                        video.official === true
                );

                const anyTrailer = data.results.find(
                    (video) => video.type === 'Trailer' && video.site === 'YouTube'
                );

                setTrailer(officialTrailer || anyTrailer || null);
            }
        } catch (error) {
            console.error('Error fetching movie videos:', error);
        }
    };

    const fetchSimilarMovies = async () => {
        try {
            const response = await fetch(
                `${BACKGROUND_VIDEO_BASE_API_URL}/movie/${id}/similar?language=en-US&page=1`,
                API_OPTIONS
            );
            const data = await response.json();
            setSimilarMovies(data.results || []);
        } catch (error) {
            console.error('Error fetching similar movies:', error);
        }
    };

    if (loading) {
        return <LoadingComponents />;
    }

    if (!movie) {
        return (
            <div className="text-light text-center p-5" style={{ backgroundColor: '#0a0a0a' }}>
                Movie not found
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', paddingTop: '80px' }}>
            <MovieDetailsInfo movie={movie} trailer={trailer} cast={cast} />

            {/* IMPORTANT: Pass movie prop here */}
            <ChooseMovieDate movie={movie} />

            <SimilarMovies movies={similarMovies} />
        </div>
    );
};

export default MovieDetails;
