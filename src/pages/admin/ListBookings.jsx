import { useState, useEffect } from 'react';

const ListBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        loadBookings();
    }, []);

    useEffect(() => {
        filterBookingsList();
    }, [searchTerm, filterStatus, bookings]);

    const loadBookings = () => {
        const storedBookings = JSON.parse(localStorage.getItem('movieBookings') || '[]');
        setBookings(storedBookings);
        setFilteredBookings(storedBookings);
    };

    const filterBookingsList = () => {
        let filtered = [...bookings];

        if (filterStatus !== 'all') {
            filtered = filtered.filter((b) => b.status === filterStatus);
        }

        if (searchTerm) {
            filtered = filtered.filter(
                (b) =>
                    b.movieTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (b.userName && b.userName.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        setFilteredBookings(filtered);
    };

    // Helper function to get username
    const getUserName = (booking) => {
        // If userName is already stored in booking
        if (booking.userName) {
            return booking.userName;
        }

        // Default fallback
        return 'Guest User';
    };

    const handleDelete = (bookingId) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            const updatedBookings = bookings.filter((b) => b.id !== bookingId);
            localStorage.setItem('movieBookings', JSON.stringify(updatedBookings));
            setBookings(updatedBookings);
        }
    };

    const handleStatusChange = (bookingId, newStatus) => {
        const updatedBookings = bookings.map((b) =>
            b.id === bookingId ? { ...b, status: newStatus } : b
        );
        localStorage.setItem('movieBookings', JSON.stringify(updatedBookings));
        setBookings(updatedBookings);
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-4">
                <h2 className="text-light fw-bold">
                    List <span className="text-danger">Bookings</span>
                </h2>
            </div>

            {/* Filters */}
            <div className="row mb-4">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by movie name, booking ID, or user name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            backgroundColor: '#1a1a1a',
                            border: '1px solid #333',
                            color: '#fff',
                        }}
                    />
                </div>
                <div className="col-md-3">
                    <select
                        className="form-select"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        style={{
                            backgroundColor: '#1a1a1a',
                            border: '1px solid #333',
                            color: '#fff',
                        }}
                    >
                        <option value="all">All Status</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
                <div className="col-md-3 text-end">
                    <span className="text-muted">
                        Total: <strong className="text-light">{filteredBookings.length}</strong>{' '}
                        bookings
                    </span>
                </div>
            </div>

            {/* Bookings Table */}
            <div className="table-responsive">
                <table className="table table-dark table-hover">
                    <thead>
                        <tr style={{ backgroundColor: '#2a2a2a' }}>
                            <th>User Name</th>
                            <th>Movie Name</th>
                            <th>Show Time</th>
                            <th>Seats</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.map((booking) => (
                            <tr key={booking.id}>
                                <td>{getUserName(booking)}</td>
                                <td>{booking.movieTitle}</td>
                                <td>
                                    <div>{booking.date}</div>
                                    <small className="text-muted">{booking.time}</small>
                                </td>
                                <td>{booking.seats.join(', ')}</td>
                                <td className="fw-bold">₹{booking.totalAmount}</td>
                                <td>
                                    <select
                                        className={`form-select form-select-sm ${
                                            booking.status === 'confirmed'
                                                ? 'bg-success'
                                                : booking.status === 'cancelled'
                                                ? 'bg-danger'
                                                : 'bg-warning text-dark'
                                        }`}
                                        value={booking.status}
                                        onChange={(e) =>
                                            handleStatusChange(booking.id, e.target.value)
                                        }
                                        style={{
                                            border: 'none',
                                            color: booking.status === 'pending' ? '#000' : '#fff',
                                        }}
                                    >
                                        <option value="confirmed">Confirmed</option>
                                        <option value="cancelled">Cancelled</option>
                                        <option value="pending">Pending</option>
                                    </select>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(booking.id)}
                                    >
                                        🗑️ Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredBookings.length === 0 && (
                <div className="text-center py-5">
                    <p className="text-muted">No bookings found</p>
                </div>
            )}
        </div>
    );
};

export default ListBookings;
