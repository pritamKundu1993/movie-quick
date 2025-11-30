import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovieContext } from '../hooks/useMovieContext';
import { IMAGE_CDN } from '../utils/constants';
import LoadingComponents from './LoadingComponents';

const FeaturedMovie = () => {
    const { movie, trailer, loading } = useMovieContext();
    const navigate = useNavigate();
    const [showTrailerModal, setShowTrailerModal] = useState(false);

    const formatRuntime = (minutes) => {
        if (!minutes) return '';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const getGenres = (genres) => {
        if (!genres || genres.length === 0) return '';
        return genres
            .slice(0, 3)
            .map((g) => g.name)
            .join(' | ');
    };

    const getReleaseYear = (date) => {
        if (!date) return '';
        return new Date(date).getFullYear();
    };

    const handleExploreMovies = () => {
        if (movie) {
            navigate(`/movie/${movie.id}`);
        }
    };

    const handleWatchTrailer = () => {
        if (trailer) {
            setShowTrailerModal(true);
        }
    };

    const closeTrailerModal = () => {
        setShowTrailerModal(false);
    };

    if (loading) {
        return <LoadingComponents />;
    }

    if (!movie) {
        return null;
    }

    return (
        <>
            <section
                className="featured-movie position-relative d-flex align-items-center text-light"
                style={{
                    backgroundImage: `url('${IMAGE_CDN}${movie.backdrop_path}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                    margin: 0,
                    padding: 0,
                }}
            >
                <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        background:
                            'linear-gradient(to right, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.3) 100%)',
                        zIndex: 1,
                    }}
                ></div>

                <div className="container position-relative" style={{ zIndex: 2 }}>
                    <div className="col-lg-6">
                        {movie.production_companies && movie.production_companies[0]?.logo_path && (
                            <img
                                src={`${IMAGE_CDN}${movie.production_companies[0].logo_path}`}
                                alt={movie.production_companies[0].name}
                                height="40"
                                className="mb-3"
                                style={{ filter: 'brightness(0) invert(1)' }}
                            />
                        )}

                        <h1 className="display-4 fw-bold">{movie.title || movie.original_title}</h1>

                        <p className="text-muted mb-3">
                            {getGenres(movie.genres)} &nbsp; • &nbsp;
                            {getReleaseYear(movie.release_date)} &nbsp; • &nbsp;
                            {formatRuntime(movie.runtime)}
                        </p>

                        <p className="lead mb-4">{movie.overview}</p>

                        <div className="d-flex gap-3">
                            <button
                                onClick={handleExploreMovies}
                                className="btn btn-danger btn-lg rounded-pill px-4"
                            >
                                Explore Movies ➡️
                            </button>
                            {trailer && (
                                <button
                                    onClick={handleWatchTrailer}
                                    className="btn btn-outline-light btn-lg rounded-pill px-4"
                                >
                                    ▶️Watch Trailer
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Trailer Modal */}
            {showTrailerModal && trailer && (
                <div
                    className="modal fade show d-block"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
                    onClick={closeTrailerModal}
                >
                    <div className="modal-dialog modal-dialog-centered modal-xl">
                        <div className="modal-content bg-transparent border-0">
                            <div className="modal-header border-0">
                                <h5 className="modal-title text-light">{movie.title} - Trailer</h5>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={closeTrailerModal}
                                >
                                    ❌
                                </button>
                            </div>
                            <div className="modal-body p-0">
                                <div className="ratio ratio-16x9">
                                    <iframe
                                        width="1521"
                                        height="526"
                                        src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                                        title={movie.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        style={{ borderRadius: '8px' }}
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FeaturedMovie;
