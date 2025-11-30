import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMAGE_CDN } from '../utils/constants';

const SimilarMovies = ({ movies }) => {
    const navigate = useNavigate();
    const [visibleMovies, setVisibleMovies] = useState(4);
    const initialMovieCount = 4;

    if (!movies || movies.length === 0) return null;

    const handleViewAll = () => {
        setVisibleMovies(movies.length);
    };

    const handleShowMore = () => {
        setVisibleMovies((prev) => prev + 4);
    };

    const handleShowLess = () => {
        setVisibleMovies(initialMovieCount);
        // Scroll to the section
        const section = document.getElementById('similar-movies-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleMovieClick = (movieId) => {
        navigate(`/movie/${movieId}`);
        window.scrollTo(0, 0);
    };

    return (
        <div id="similar-movies-section" className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="text-light fw-bold mb-0">You May Also Like</h3>
                <button
                    onClick={handleViewAll}
                    className="btn btn-link text-danger text-decoration-none p-0"
                >
                    View All ➡️
                </button>
            </div>

            <div className="row">
                {movies.slice(0, visibleMovies).map((movie) => (
                    <div key={movie.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div
                            className="card bg-dark text-light border-0 h-100"
                            style={{
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            }}
                            onClick={() => handleMovieClick(movie.id)}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow =
                                    '0 10px 30px rgba(220, 53, 69, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div className="position-relative overflow-hidden rounded-top">
                                <img
                                    src={
                                        movie.poster_path
                                            ? `${IMAGE_CDN}${movie.poster_path}`
                                            : 'https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png'
                                    }
                                    alt={movie.title}
                                    className="card-img-top"
                                    style={{
                                        height: '350px',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>

                            <div className="card-body">
                                <h6
                                    className="card-title fw-bold mb-2"
                                    style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {movie.title}
                                </h6>

                                <p className="text-muted small mb-3">
                                    {movie.release_date
                                        ? new Date(movie.release_date).getFullYear()
                                        : 'N/A'}{' '}
                                    • Action, Adventure • 2h 8m
                                </p>

                                <div className="d-flex justify-content-between align-items-center">
                                    <button
                                        className="btn btn-danger btn-sm rounded-pill px-4"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Buy Ticket
                                    </button>
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-star-fill text-warning me-1"></i>
                                        <span className="small">
                                            {movie.vote_average
                                                ? movie.vote_average.toFixed(1)
                                                : 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
    );
};

export default SimilarMovies;
