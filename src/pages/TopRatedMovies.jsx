import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_OPTIONS, BACKGROUND_VIDEO_BASE_API_URL, IMAGE_CDN } from '../utils/constants';
import LoadingComponents from '../components/LoadingComponents';

const TopRatedMovies = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [jumpToPage, setJumpToPage] = useState('');

    useEffect(() => {
        fetchTopRatedMovies(currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const fetchTopRatedMovies = async (page) => {
        setLoading(true);
        try {
            const response = await fetch(
                `${BACKGROUND_VIDEO_BASE_API_URL}/movie/top_rated?language=en-US&page=${page}`,
                API_OPTIONS
            );
            const data = await response.json();

            setMovies(data.results || []);
            setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching top rated movies:', error);
            setLoading(false);
        }
    };

    const handleMovieClick = (id) => {
        navigate(`/movie/${id}`);
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleJumpToPage = (e) => {
        e.preventDefault();
        const page = parseInt(jumpToPage);
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            setJumpToPage('');
        } else {
            alert(`Please enter a page number between 1 and ${totalPages}`);
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    if (loading) {
        return <LoadingComponents />;
    }

    return (
        <div
            style={{
                backgroundColor: '#0a0a0a',
                minHeight: '100vh',
                paddingTop: '100px',
                paddingBottom: '50px',
            }}
        >
            <div className="container">
                {/* Header */}
                <div className="mb-5">
                    <div className="text-center mb-4">
                        <h1 className="text-light fw-bold mb-2">Top Rated Movies</h1>
                        <p className="text-muted">Discover the highest rated movies of all time</p>
                    </div>

                    {/* Stats and Jump to Page */}
                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                        <div className="d-flex gap-2">
                            <span className="badge bg-danger">
                                Page {currentPage} of {totalPages}
                            </span>
                            <span className="badge bg-secondary">{movies.length} Movies</span>
                        </div>

                        {/* Jump to Page */}
                        <form onSubmit={handleJumpToPage} className="d-flex gap-2">
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                placeholder="Jump to page"
                                value={jumpToPage}
                                onChange={(e) => setJumpToPage(e.target.value)}
                                min="1"
                                max={totalPages}
                                style={{
                                    width: '120px',
                                    backgroundColor: '#1a1a1a',
                                    color: '#fff',
                                    border: '1px solid #333',
                                }}
                            />
                            <button type="submit" className="btn btn-sm btn-danger">
                                ➡️
                            </button>
                        </form>
                    </div>
                </div>

                {/* Movies Grid */}
                <div className="row">
                    {movies.map((movie) => (
                        <div key={movie.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                            <div
                                className="card bg-dark text-light border-0 h-100"
                                style={{
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                }}
                                onClick={() => handleMovieClick(movie.id)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
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
                                                : 'https://via.placeholder.com/300x450?text=No+Image'
                                        }
                                        alt={movie.title}
                                        className="card-img-top"
                                        style={{ height: '350px', objectFit: 'cover' }}
                                    />
                                    <div className="position-absolute top-0 end-0 m-2 badge bg-dark">
                                        {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                                    </div>
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
                                        <i className="bi bi-calendar3 me-1"></i>
                                        {movie.release_date
                                            ? new Date(movie.release_date).getFullYear()
                                            : 'N/A'}
                                    </p>

                                    <button
                                        className="btn btn-danger btn-sm w-100 rounded-pill"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleMovieClick(movie.id);
                                        }}
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="d-flex justify-content-center mt-5">
                    <nav>
                        <ul className="pagination pagination-lg">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button
                                    className="page-link bg-dark text-light border-secondary"
                                    onClick={() => handlePageChange(1)}
                                >
                                    first page
                                </button>
                            </li>
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button
                                    className="page-link bg-dark text-light border-secondary"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                >
                                    ⬅️
                                </button>
                            </li>

                            {getPageNumbers().map((page) => (
                                <li
                                    key={page}
                                    className={`page-item ${currentPage === page ? 'active' : ''}`}
                                >
                                    <button
                                        className={`page-link ${
                                            currentPage === page
                                                ? 'bg-danger border-danger'
                                                : 'bg-dark text-light border-secondary'
                                        }`}
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </button>
                                </li>
                            ))}

                            <li
                                className={`page-item ${
                                    currentPage === totalPages ? 'disabled' : ''
                                }`}
                            >
                                <button
                                    className="page-link bg-dark text-light border-secondary"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                >
                                    ➡️
                                </button>
                            </li>
                            <li
                                className={`page-item ${
                                    currentPage === totalPages ? 'disabled' : ''
                                }`}
                            >
                                <button
                                    className="page-link bg-dark text-light border-secondary"
                                    onClick={() => handlePageChange(totalPages)}
                                >
                                    last page
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="text-center mt-3">
                    <p className="text-muted small">
                        Showing page {currentPage} of {totalPages}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TopRatedMovies;
