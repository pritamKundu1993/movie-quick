import { useState, useEffect } from 'react';
import { API_OPTIONS, IMAGE_CDN } from '../../utils/constants';

const AddShows = () => {
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showPrice, setShowPrice] = useState('');
    const [selectedDateTime, setSelectedDateTime] = useState('');
    const [showTimes, setShowTimes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNowPlayingMovies();
    }, []);

    const fetchNowPlayingMovies = async () => {
        try {
            const response = await fetch(
                'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
                API_OPTIONS
            );
            const data = await response.json();
            setNowPlayingMovies(data.results.slice(0, 8));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching movies:', error);
            setLoading(false);
        }
    };

    const handleMovieSelect = (movie) => {
        setSelectedMovie(movie);
    };

    const handleAddTime = () => {
        if (!selectedDateTime) {
            alert('Please select date and time');
            return;
        }

        const dateTime = new Date(selectedDateTime);
        const date = dateTime.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
        const time = dateTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });

        const newShowTime = {
            id: Date.now().toString(),
            date,
            time,
            dateTime: selectedDateTime,
        };

        setShowTimes([...showTimes, newShowTime]);
        setSelectedDateTime('');
    };

    const handleRemoveTime = (id) => {
        setShowTimes(showTimes.filter((time) => time.id !== id));
    };

    const handleAddShow = () => {
        if (!selectedMovie) {
            alert('Please select a movie');
            return;
        }
        if (!showPrice) {
            alert('Please enter show price');
            return;
        }
        if (showTimes.length === 0) {
            alert('Please add at least one show time');
            return;
        }

        const newShow = {
            id: Date.now().toString(),
            movieId: selectedMovie.id,
            movieTitle: selectedMovie.title,
            moviePoster: selectedMovie.poster_path,
            movieBackdrop: selectedMovie.backdrop_path,
            price: parseFloat(showPrice),
            showTimes: showTimes,
            createdAt: new Date().toISOString(),
            status: 'active',
        };

        // Save to localStorage
        const existingShows = JSON.parse(localStorage.getItem('movieShows') || '[]');
        localStorage.setItem('movieShows', JSON.stringify([...existingShows, newShow]));

        alert(
            `✅ Show added successfully!\n\n` +
                `Movie: ${selectedMovie.title}\n` +
                `Price: ₹${showPrice}\n` +
                `Show Times: ${showTimes.length}`
        );

        // Reset form
        setSelectedMovie(null);
        setShowPrice('');
        setShowTimes([]);
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <div
                    className="spinner-border text-danger"
                    style={{ width: '3rem', height: '3rem' }}
                >
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="mb-4">
                <h2 className="text-light fw-bold">
                    Add <span className="text-danger">Shows</span>
                </h2>
            </div>

            {/* Now Playing Movies */}
            <div className="mb-5">
                <h5 className="text-light mb-3">Now Playing Movies</h5>
                <div className="row">
                    {nowPlayingMovies.map((movie) => (
                        <div key={movie.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                            <div
                                onClick={() => handleMovieSelect(movie)}
                                className="position-relative rounded overflow-hidden"
                                style={{
                                    backgroundColor: '#1a1a1a',
                                    border:
                                        selectedMovie?.id === movie.id
                                            ? '3px solid #dc3545'
                                            : '1px solid #2a2a2a',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                }}
                                onMouseEnter={(e) => {
                                    if (selectedMovie?.id !== movie.id) {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                {/* Selection Indicator */}
                                <button
                                    className="position-absolute top-0 end-0 m-2 btn btn-sm rounded-circle"
                                    style={{
                                        width: '35px',
                                        height: '35px',
                                        padding: 0,
                                        backgroundColor:
                                            selectedMovie?.id === movie.id
                                                ? '#dc3545'
                                                : 'rgba(0,0,0,0.7)',
                                        border: 'none',
                                        fontSize: '18px',
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleMovieSelect(movie);
                                    }}
                                >
                                    {selectedMovie?.id === movie.id ? '✅' : '❤️'}
                                </button>

                                <img
                                    src={
                                        movie.poster_path
                                            ? `${IMAGE_CDN}${movie.poster_path}`
                                            : 'https://via.placeholder.com/200x300'
                                    }
                                    alt={movie.title}
                                    className="w-100"
                                    style={{ height: '280px', objectFit: 'cover' }}
                                />
                                <div className="p-3">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <span className="text-danger">
                                            ⭐{' '}
                                            {movie.vote_average
                                                ? movie.vote_average.toFixed(1)
                                                : 'N/A'}
                                            /5
                                        </span>
                                        <span className="text-muted small">
                                            {movie.vote_count
                                                ? `${(movie.vote_count / 1000).toFixed(1)}K`
                                                : '0'}{' '}
                                            Votes
                                        </span>
                                    </div>
                                    <h6
                                        className="text-light mb-1"
                                        style={{
                                            fontSize: '14px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {movie.title}
                                    </h6>
                                    <small className="text-muted">
                                        Action, Adventure, Thriller
                                    </small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Show Form */}
            <div
                className="p-4 rounded"
                style={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #2a2a2a',
                }}
            >
                {selectedMovie && (
                    <div className="alert alert-success mb-4">
                        ✅ Selected Movie: <strong>{selectedMovie.title}</strong>
                    </div>
                )}

                <form onSubmit={(e) => e.preventDefault()}>
                    {/* Show Price */}
                    <div className="mb-4">
                        <label className="form-label text-light fw-bold">Show Price</label>
                        <input
                            type="number"
                            className="form-control form-control-lg"
                            placeholder="Ex: Enter your price (e.g., 150)"
                            value={showPrice}
                            onChange={(e) => setShowPrice(e.target.value)}
                            style={{
                                backgroundColor: '#0f0f0f',
                                border: '1px solid #2a2a2a',
                                color: '#fff',
                            }}
                        />
                    </div>

                    {/* Select Date and Time */}
                    <div className="mb-4">
                        <label className="form-label text-light fw-bold">
                            Select Date and Time
                        </label>
                        <div className="d-flex gap-2">
                            <input
                                type="datetime-local"
                                className="form-control form-control-lg"
                                value={selectedDateTime}
                                onChange={(e) => setSelectedDateTime(e.target.value)}
                                style={{
                                    backgroundColor: '#0f0f0f',
                                    border: '1px solid #2a2a2a',
                                    color: '#fff',
                                }}
                            />
                            <button
                                type="button"
                                onClick={handleAddTime}
                                className="btn btn-danger"
                                style={{ minWidth: '120px' }}
                            >
                                Add Time
                            </button>
                        </div>
                    </div>

                    {/* Selected Date-Time Display */}
                    {showTimes.length > 0 && (
                        <div className="mb-4">
                            <label className="form-label text-light fw-bold">
                                Selected Date-Time
                            </label>
                            <div className="d-flex flex-wrap gap-2">
                                {showTimes.map((time) => (
                                    <div
                                        key={time.id}
                                        className="d-flex align-items-center gap-2 px-3 py-2 rounded"
                                        style={{
                                            backgroundColor: '#0f0f0f',
                                            border: '1px solid #2a2a2a',
                                        }}
                                    >
                                        <span className="text-light">{time.date}</span>
                                        <span className="text-light">{time.time}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTime(time.id)}
                                            className="btn btn-sm btn-danger"
                                            style={{ padding: '2px 8px', fontSize: '12px' }}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="button"
                        onClick={handleAddShow}
                        className="btn btn-danger btn-lg px-5"
                    >
                        Add Show
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddShows;
