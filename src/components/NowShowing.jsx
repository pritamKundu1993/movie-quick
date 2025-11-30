import { useEffect, useState } from 'react';
import { API_OPTIONS, BACKGROUND_VIDEO_BASE_API_URL } from '../utils/constants';
import MovieCard from './MovieCard';
import LoadingComponents from './LoadingComponents';

const NowShowing = () => {
    const initialMovieCount = 8;
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleMovies, setVisibleMovies] = useState(initialMovieCount);

    useEffect(() => {
        fetchNowShowingMovies();
    }, []);

    const fetchNowShowingMovies = async () => {
        try {
            // Fetch now playing movies from TMDB
            const response = await fetch(
                `${BACKGROUND_VIDEO_BASE_API_URL}/movie/now_playing?language=en-US&page=1`,
                API_OPTIONS
            );
            const data = await response.json();

            if (data.results) {
                setMovies(data.results);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching now showing movies:', error);
            setLoading(false);
        }
    };

    const handleShowMore = () => {
        setVisibleMovies((prevVisible) => prevVisible + 8);
    };

    const handleShowLess = () => {
        setVisibleMovies(initialMovieCount);
        // Scroll back to the "Now Showing" section
        window.scrollTo({
            top: document.querySelector('.now-showing-section')?.offsetTop - 100 || 0,
            behavior: 'smooth',
        });
    };

    if (loading) {
        return <LoadingComponents />;
    }

    return (
        <section className="py-5 now-showing-section" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="container">
                {/* Section Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-light fw-bold">Now Showing</h2>
                </div>

                {/* Movie Grid */}
                <div className="row">
                    {movies.slice(0, visibleMovies).map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>

                {/* Show More / Show Less Buttons */}
                <div className="text-center mt-4">
                    {visibleMovies < movies.length && (
                        <button
                            className="btn btn-danger rounded-pill px-5 py-2"
                            onClick={handleShowMore}
                        >
                            Show more
                        </button>
                    )}

                    {visibleMovies > initialMovieCount && (
                        <button
                            className="btn btn-outline-danger rounded-pill px-5 py-2 ms-3"
                            onClick={handleShowLess}
                        >
                            Show less
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default NowShowing;
