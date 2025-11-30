import { useState, useEffect } from 'react';

const ListShows = () => {
    const [shows, setShows] = useState([]);
    const [filteredShows, setFilteredShows] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadShows();
    }, []);

    useEffect(() => {
        filterShowsList();
    }, [searchTerm, shows]);

    const loadShows = () => {
        const storedShows = JSON.parse(localStorage.getItem('movieShows') || '[]');
        const sortedShows = storedShows.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setShows(sortedShows);
        setFilteredShows(sortedShows);
    };

    const filterShowsList = () => {
        if (searchTerm) {
            const filtered = shows.filter((show) =>
                show.movieTitle.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredShows(filtered);
        } else {
            setFilteredShows(shows);
        }
    };

    const handleDelete = (showId) => {
        if (window.confirm('Are you sure you want to delete this show?')) {
            const updatedShows = shows.filter((show) => show.id !== showId);
            localStorage.setItem('movieShows', JSON.stringify(updatedShows));
            setShows(updatedShows);
            alert('✅ Show deleted successfully!');
        }
    };

    const getShowStats = (show) => {
        const bookings = JSON.parse(localStorage.getItem('movieBookings') || '[]');
        const showBookings = bookings.filter(
            (booking) =>
                booking.movieId === show.movieId &&
                booking.status === 'confirmed' &&
                show.showTimes.some(
                    (time) => time.date === booking.date && time.time === booking.time
                )
        );

        const totalBookings = showBookings.reduce((sum, b) => sum + b.totalSeats, 0);
        const totalEarning = showBookings.reduce((sum, b) => sum + b.totalAmount, 0);

        return { totalBookings, totalEarning };
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-4">
                <h2 className="text-light fw-bold">
                    List <span className="text-danger">Shows</span>
                </h2>
            </div>

            {/* Search */}
            <div className="row mb-4">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by movie name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            backgroundColor: '#1a1a1a',
                            border: '1px solid #333',
                            color: '#fff',
                        }}
                    />
                </div>
                <div className="col-md-6 text-end">
                    <span className="text-muted">
                        Total Shows: <strong className="text-light">{filteredShows.length}</strong>
                    </span>
                </div>
            </div>

            {/* Table */}
            {filteredShows.length === 0 ? (
                <div className="text-center py-5">
                    <div style={{ fontSize: '80px' }}>🎬</div>
                    <h3 className="text-light mt-3">No Shows Found</h3>
                    <p className="text-muted">Start by adding shows from the Add Shows page</p>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-dark table-hover">
                        <thead>
                            <tr style={{ backgroundColor: '#2a2a2a' }}>
                                <th>Movie Name</th>
                                <th>Show Time</th>
                                <th>Total Bookings</th>
                                <th>Earning</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredShows.map((show) => {
                                const stats = getShowStats(show);

                                return (
                                    <tr key={show.id}>
                                        <td>
                                            {/* ✅ FIXED: Only show movie title */}
                                            <strong className="text-light">
                                                {show.movieTitle}
                                            </strong>
                                        </td>
                                        <td>
                                            {show.showTimes.slice(0, 2).map((time) => (
                                                <div key={time.id} className="text-light">
                                                    {time.date} • {time.time}
                                                </div>
                                            ))}
                                            {show.showTimes.length > 2 && (
                                                <small className="text-danger">
                                                    +{show.showTimes.length - 2} more
                                                </small>
                                            )}
                                        </td>
                                        <td className="text-light">{stats.totalBookings}</td>
                                        <td className="text-light fw-bold">
                                            ₹{stats.totalEarning}
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleDelete(show.id)}
                                                className="btn btn-sm btn-danger"
                                            >
                                                🗑️ Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ListShows;
