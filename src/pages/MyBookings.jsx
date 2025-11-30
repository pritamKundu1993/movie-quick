import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getBookings, cancelBooking } from '../utils/bookingStorage';
import { IMAGE_CDN } from '../utils/constants';
import { useAuth } from '../hooks/useAUth';

const MyBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        loadBookings();
    }, [user]);

    const loadBookings = () => {
        const allBookings = getBookings();

        //  Filter bookings by current user ID
        const userBookings = allBookings.filter((booking) => booking.userId === user?.id);

        // Sort by booking date (newest first)
        const sortedBookings = userBookings.sort(
            (a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)
        );
        setBookings(sortedBookings);
    };

    const handleCancelBooking = (id) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            const success = cancelBooking(id);
            if (success) {
                loadBookings();
                alert(' Booking cancelled successfully!');
            }
        }
    };

    const handleClearAll = () => {
        if (
            window.confirm(
                'Are you sure you want to clear all YOUR bookings? This cannot be undone.'
            )
        ) {
            // ✅ Clear only current user's bookings
            const allBookings = getBookings();
            const otherUsersBookings = allBookings.filter((b) => b.userId !== user?.id);
            localStorage.setItem('movieBookings', JSON.stringify(otherUsersBookings));
            loadBookings();
            alert('✅ All your bookings cleared!');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const filteredBookings = bookings.filter((booking) => {
        if (filter === 'all') return true;
        return booking.status === filter;
    });

    // Empty state
    if (bookings.length === 0) {
        return (
            <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', paddingTop: '100px' }}>
                <div className="container text-center py-5">
                    <div style={{ fontSize: '80px' }}>🎟️</div>
                    <h2 className="text-light mt-4 fw-bold">No Bookings Yet</h2>
                    <p className="text-muted lead">Start booking your favorite movies!</p>
                    <Link to="/" className="btn btn-danger btn-lg rounded-pill px-5 mt-3">
                        🎬 Browse Movies
                    </Link>
                </div>
            </div>
        );
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
                {/* Header with filters */}
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
                    <div>
                        <h2 className="text-light fw-bold mb-1">🎫 My Bookings</h2>
                        {user && (
                            <p className="text-muted small mb-0">
                                Showing bookings for{' '}
                                <strong className="text-light">{user.name}</strong>
                            </p>
                        )}
                    </div>
                    <div className="d-flex gap-2 flex-wrap">
                        <button
                            onClick={() => setFilter('all')}
                            className={`btn btn-sm rounded-pill ${
                                filter === 'all' ? 'btn-danger' : 'btn-outline-secondary'
                            }`}
                        >
                            All ({bookings.length})
                        </button>
                        <button
                            onClick={() => setFilter('confirmed')}
                            className={`btn btn-sm rounded-pill ${
                                filter === 'confirmed' ? 'btn-danger' : 'btn-outline-secondary'
                            }`}
                        >
                            Confirmed ({bookings.filter((b) => b.status === 'confirmed').length})
                        </button>
                        <button
                            onClick={() => setFilter('cancelled')}
                            className={`btn btn-sm rounded-pill ${
                                filter === 'cancelled' ? 'btn-danger' : 'btn-outline-secondary'
                            }`}
                        >
                            Cancelled ({bookings.filter((b) => b.status === 'cancelled').length})
                        </button>
                        <button
                            onClick={handleClearAll}
                            className="btn btn-sm btn-outline-danger rounded-pill"
                        >
                            🗑️ Clear All
                        </button>
                    </div>
                </div>

                {/* Bookings list */}
                <div className="row">
                    {filteredBookings.map((booking) => (
                        <div key={booking.id} className="col-lg-6 mb-4">
                            <div
                                className="card bg-dark text-light border-0 h-100"
                                style={{
                                    backgroundColor: 'rgba(30, 30, 30, 0.8)',
                                    border: `2px solid ${
                                        booking.status === 'cancelled'
                                            ? '#6c757d'
                                            : 'rgba(220, 53, 69, 0.3)'
                                    } !important`,
                                    transition: 'transform 0.2s',
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.transform = 'translateY(-5px)')
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.transform = 'translateY(0)')
                                }
                            >
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img
                                            src={
                                                booking.moviePoster
                                                    ? `${IMAGE_CDN}${booking.moviePoster}`
                                                    : 'https://via.placeholder.com/200x300?text=No+Image'
                                            }
                                            alt={booking.movieTitle}
                                            className="img-fluid rounded-start h-100"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body p-4">
                                            <div className="d-flex justify-content-between align-items-start mb-3">
                                                <h5 className="card-title fw-bold mb-0">
                                                    {booking.movieTitle}
                                                </h5>
                                                <span
                                                    className={`badge ${
                                                        booking.status === 'cancelled'
                                                            ? 'bg-secondary'
                                                            : 'bg-success'
                                                    }`}
                                                >
                                                    {booking.status.toUpperCase()}
                                                </span>
                                            </div>

                                            <div className="mb-3">
                                                <p className="mb-2 small">
                                                    📅 <strong>Date:</strong> {booking.date}
                                                </p>
                                                <p className="mb-2 small">
                                                    ⏰ <strong>Time:</strong> {booking.time}
                                                </p>
                                                <p className="mb-2 small">
                                                    🎫 <strong>Seats:</strong>{' '}
                                                    {booking.seats.join(', ')}
                                                </p>
                                                <p className="mb-2 small">
                                                    🔢 <strong>ID:</strong>{' '}
                                                    {booking.id.slice(0, 12)}...
                                                </p>
                                            </div>

                                            <div
                                                className="d-flex justify-content-between align-items-center mb-3 p-2 rounded"
                                                style={{
                                                    backgroundColor: 'rgba(220, 53, 69, 0.1)',
                                                }}
                                            >
                                                <div>
                                                    <small className="text-muted d-block">
                                                        Total Amount
                                                    </small>
                                                    <h4 className="text-danger mb-0">
                                                        ₹{booking.totalAmount}
                                                    </h4>
                                                </div>
                                                <div className="text-end">
                                                    <small className="text-muted d-block">
                                                        Booked on
                                                    </small>
                                                    <p className="mb-0 small">
                                                        {formatDate(booking.bookingDate)}
                                                    </p>
                                                </div>
                                            </div>

                                            {booking.status === 'confirmed' && (
                                                <button
                                                    onClick={() => handleCancelBooking(booking.id)}
                                                    className="btn btn-outline-danger btn-sm w-100 rounded-pill"
                                                >
                                                    ❌ Cancel Booking
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No results for filter */}
                {filteredBookings.length === 0 && bookings.length > 0 && (
                    <div className="text-center py-5">
                        <p className="text-muted">No {filter} bookings found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
