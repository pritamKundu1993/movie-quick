import { IMAGE_CDN } from '../utils/constants';

const MovieDetailsInfo = ({ movie, trailer, cast }) => {
    const formatRuntime = (minutes) => {
        if (!minutes) return '';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const getGenres = (genres) => {
        if (!genres || genres.length === 0) return '';
        return genres.map((g) => g.name).join(' • ');
    };

    const getReleaseDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const handleWatchTrailer = () => {
        if (trailer && trailer.key) {
            window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
        } else {
            alert('Trailer not available for this movie');
        }
    };

    return (
        <>
            {/* Hero Section */}
            <div
                className="position-relative"
                style={{
                    backgroundImage: `url('${IMAGE_CDN}${movie.backdrop_path}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        background:
                            'linear-gradient(to right, rgba(0, 0, 0, 0.95) 40%, rgba(0, 0, 0, 0.6) 100%)',
                    }}
                ></div>

                <div className="container position-relative py-5">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 mb-4 mb-md-0">
                            <img
                                src={`${IMAGE_CDN}${movie.poster_path}`}
                                alt={movie.title}
                                className="w-100 rounded"
                                style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}
                            />
                        </div>

                        <div className="col-lg-9 col-md-8 text-light">
                            <span className="badge bg-danger mb-2">
                                {movie.original_language?.toUpperCase() || 'ENGLISH'}
                            </span>

                            <h1 className="display-4 fw-bold mb-3">{movie.title}</h1>

                            <div className="d-flex align-items-center mb-3">
                                <i className="bi bi-star-fill text-warning me-2"></i>
                                <span className="fs-5 fw-bold mr-2">
                                    {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                                </span>
                                <span className="text-muted ms-2">IMDb Rating</span>
                            </div>

                            <p className="lead mb-4" style={{ maxWidth: '800px' }}>
                                {movie.overview}
                            </p>

                            <div className="mb-4">
                                <p className="mb-2">
                                    <strong>{formatRuntime(movie.runtime)}</strong> •{' '}
                                    {getGenres(movie.genres)} • {getReleaseDate(movie.release_date)}
                                </p>
                            </div>

                            <div className="d-flex gap-3 flex-wrap">
                                {trailer && trailer.key ? (
                                    <button
                                        className="btn btn-outline-light btn-lg rounded-pill px-4"
                                        onClick={handleWatchTrailer}
                                    >
                                        ▶️ Watch Trailer
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-outline-secondary btn-lg rounded-pill px-4"
                                        disabled
                                    >
                                        Trailer Unavailable
                                    </button>
                                )}

                                <button className="btn btn-outline-light btn-lg rounded-circle">
                                    💖
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cast Section */}
            {cast && cast.length > 0 && (
                <div className="container py-5">
                    <h3 className="text-light fw-bold mb-4">Your Favorite Cast</h3>
                    <div className="row g-3">
                        {cast.map((actor) => (
                            <div key={actor.id} className="col-lg-1-7 col-md-3 col-sm-4 col-6">
                                <div className="text-center">
                                    <div
                                        className="rounded-circle overflow-hidden mb-2 mx-auto"
                                        style={{
                                            width: '120px',
                                            height: '120px',
                                            border: '3px solid #333',
                                        }}
                                    >
                                        <img
                                            src={
                                                actor.profile_path
                                                    ? `${IMAGE_CDN}${actor.profile_path}`
                                                    : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
                                            }
                                            alt={actor.name}
                                            className="w-100 h-100"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <h6 className="text-light mb-1 small fw-bold">{actor.name}</h6>
                                    <p className="text-muted small mb-0">{actor.character}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default MovieDetailsInfo;
