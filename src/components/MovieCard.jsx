import { useNavigate } from 'react-router-dom';
import { IMAGE_CDN } from '../utils/constants';

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();
    const { id, title, poster_path, vote_average, release_date, genre_ids } = movie;

    const year = release_date ? new Date(release_date).getFullYear() : 'N/A';

    const genreMap = {
        28: 'Action',
        12: 'Adventure',
        16: 'Animation',
        35: 'Comedy',
        80: 'Crime',
        99: 'Documentary',
        18: 'Drama',
        10751: 'Family',
        14: 'Fantasy',
        36: 'History',
        27: 'Horror',
        10402: 'Music',
        9648: 'Mystery',
        10749: 'Romance',
        878: 'Sci-Fi',
        10770: 'TV Movie',
        53: 'Thriller',
        10752: 'War',
        37: 'Western',
    };

    const getGenres = () => {
        if (!genre_ids || genre_ids.length === 0) return 'Action';
        return genre_ids
            .slice(0, 2)
            .map((id) => genreMap[id] || 'Unknown')
            .join(', ');
    };

    const handleCardClick = () => {
        navigate(`/movie/${id}`);
    };

    return (
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div
                className="card bg-dark text-light border-0 h-100"
                style={{ cursor: 'pointer' }}
                onClick={handleCardClick}
            >
                <div className="position-relative overflow-hidden rounded-top">
                    <img
                        src={
                            poster_path
                                ? `${IMAGE_CDN}${poster_path}`
                                : 'https://via.placeholder.com/300x450?text=No+Image'
                        }
                        alt={title}
                        className="card-img-top"
                        style={{
                            height: '350px',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease',
                        }}
                        onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                        onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                    />
                </div>

                <div className="card-body d-flex flex-column">
                    <h6
                        className="card-title fw-bold mb-2"
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {title}
                    </h6>

                    <p className="text-muted small mb-3">
                        {year} • {getGenres()} • 2h 8m
                    </p>

                    <div className="d-flex justify-content-between align-items-center mt-auto">
                        <button
                            className="btn btn-danger btn-sm rounded-pill px-4"
                            onClick={(e) => {
                                e.stopPropagation();
                                // Handle buy ticket
                            }}
                        >
                            Buy Ticket
                        </button>
                        <div className="d-flex align-items-center">
                            <i className="bi bi-star-fill text-warning me-1"></i>
                            <span className="small">
                                {vote_average ? vote_average.toFixed(1) : 'N/A'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
