import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveBooking, getBookings } from '../utils/bookingStorage';
import { useAuth } from '../hooks/useAUth';

const SeatBookings = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { movie, dateString } = location.state || {};

    // Available timings
    const timings = ['06:00 AM', '09:00 AM', '12:00 PM', '04:30 PM', '08:00 PM'];
    const [selectedTiming, setSelectedTiming] = useState(timings[0]);

    // Seat layout configuration
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const seatsPerRow = {
        A: 10,
        B: 10,
        C: 12,
        D: 12,
        E: 12,
        F: 12,
        G: 12,
    };

    const PRICE_PER_SEAT = 150;

    // Initialize seats state
    const [seats, setSeats] = useState(() => {
        const initialSeats = {};
        rows.forEach((row) => {
            initialSeats[row] = Array(seatsPerRow[row])
                .fill(null)
                .map((_, index) => ({
                    id: `${row}${index + 1}`,
                    row: row,
                    number: index + 1,
                    status: 'available',
                }));
        });

        return initialSeats;
    });

    const [selectedSeats, setSelectedSeats] = useState([]);

    // ✅ Load booked seats when movie, date, or timing changes
    useEffect(() => {
        loadBookedSeats();
    }, [movie, dateString, selectedTiming]);

    // ✅ Function to load already booked seats
    const loadBookedSeats = () => {
        if (!movie || !dateString || !selectedTiming) return;

        // Get all bookings from localStorage
        const allBookings = getBookings();

        // Filter bookings for same movie, date, and time
        const matchingBookings = allBookings.filter(
            (booking) =>
                booking.movieId === movie.id &&
                booking.date === dateString &&
                booking.time === selectedTiming &&
                booking.status === 'confirmed' // Only consider confirmed bookings
        );

        // Get all booked seats for this show
        const bookedSeats = matchingBookings.flatMap((booking) => booking.seats);

        // Update seat status to 'booked' for already taken seats
        const updatedSeats = { ...seats };
        rows.forEach((row) => {
            updatedSeats[row] = updatedSeats[row].map((seat) => ({
                ...seat,
                status: bookedSeats.includes(seat.id) ? 'booked' : 'available',
            }));
        });

        setSeats(updatedSeats);
        setSelectedSeats([]); // Clear selected seats when timing changes
    };

    // Handle timing change
    const handleTimingChange = (time) => {
        setSelectedTiming(time);
        setSelectedSeats([]); // Clear selected seats
    };

    // Handle seat click
    const handleSeatClick = (row, seatIndex) => {
        const seat = seats[row][seatIndex];

        if (seat.status === 'booked') return;

        const newSeats = { ...seats };

        if (seat.status === 'selected') {
            newSeats[row][seatIndex].status = 'available';
            setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
        } else {
            newSeats[row][seatIndex].status = 'selected';
            setSelectedSeats([...selectedSeats, seat]);
        }

        setSeats(newSeats);
    };

    // Get seat style based on status
    const getSeatStyle = (status) => {
        const baseStyle = {
            width: '35px',
            height: '35px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            fontWeight: '600',
            transition: 'all 0.2s ease',
            border: '2px solid transparent',
        };

        switch (status) {
            case 'available':
                return {
                    ...baseStyle,
                    backgroundColor: '#374151',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    border: '2px solid #4b5563',
                };
            case 'selected':
                return {
                    ...baseStyle,
                    backgroundColor: '#dc3545',
                    color: '#ffffff',
                    cursor: 'pointer',
                    border: '2px solid #ff4757',
                    boxShadow: '0 0 10px rgba(220, 53, 69, 0.5)',
                };
            case 'booked':
                return {
                    ...baseStyle,
                    backgroundColor: '#1f2937',
                    color: '#6b7280',
                    cursor: 'not-allowed',
                    border: '2px solid #111827',
                    opacity: 0.5,
                };
            default:
                return baseStyle;
        }
    };

    // Handle proceed to checkout
    const handleProceed = () => {
        if (selectedSeats.length === 0) {
            alert('Please select at least one seat');
            return;
        }

        // Create booking data with user info
        const bookingData = {
            userId: user?.id,
            userName: user?.name,
            movieId: movie?.id,
            movieTitle: movie?.title,
            moviePoster: movie?.poster_path,
            movieBackdrop: movie?.backdrop_path,
            date: dateString,
            time: selectedTiming,
            seats: selectedSeats.map((s) => s.id),
            totalSeats: selectedSeats.length,
            pricePerSeat: PRICE_PER_SEAT,
            totalAmount: selectedSeats.length * PRICE_PER_SEAT,
        };

        // Save to localStorage
        const savedBooking = saveBooking(bookingData);

        if (savedBooking) {
            const seatString = selectedSeats.map((s) => s.id).join(', ');
            alert(
                `🎉 Booking Confirmed!\n\n` +
                    `Booking ID: ${savedBooking.id}\n` +
                    `User: ${user?.name}\n` +
                    `Movie: ${movie?.title}\n` +
                    `Date: ${dateString}\n` +
                    `Time: ${selectedTiming}\n` +
                    `Seats: ${seatString}\n` +
                    `Total: ₹${bookingData.totalAmount}`
            );

            navigate('/my-bookings');
        } else {
            alert('❌ Failed to save booking. Please try again.');
        }
    };

    // ✅ Count available, selected, and booked seats
    const getSeatsCount = () => {
        let available = 0;
        let booked = 0;
        let selected = selectedSeats.length;

        rows.forEach((row) => {
            seats[row].forEach((seat) => {
                if (seat.status === 'available') available++;
                if (seat.status === 'booked') booked++;
            });
        });

        return { available, booked, selected };
    };

    const seatsCount = getSeatsCount();

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
                {/* Movie Info Header */}
                {movie && (
                    <div className="text-center mb-4">
                        <h2 className="text-light fw-bold">{movie.title}</h2>
                        <p className="text-muted">{dateString}</p>
                        {user && (
                            <div className="d-flex align-items-center justify-content-center gap-2 mt-2">
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="rounded-circle"
                                    width="30"
                                    height="30"
                                />
                                <span className="text-light small">
                                    Booking for: <strong>{user.name}</strong>
                                </span>
                            </div>
                        )}
                    </div>
                )}

                <div className="row">
                    {/* Left Side - Available Timings & Summary */}
                    <div className="col-lg-3 mb-4">
                        <div
                            className="p-4 rounded"
                            style={{
                                backgroundColor: 'rgba(30, 30, 30, 0.8)',
                                border: '1px solid rgba(220, 53, 69, 0.2)',
                            }}
                        >
                            {/* Available Timings Section */}
                            <h5 className="text-light fw-bold mb-3">⏰ Available Timings</h5>
                            <div className="d-flex flex-column gap-2">
                                {timings.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => handleTimingChange(time)}
                                        className={`btn rounded-pill py-3 ${
                                            selectedTiming === time
                                                ? 'btn-danger'
                                                : 'btn-outline-secondary'
                                        }`}
                                        style={{
                                            fontWeight: '600',
                                            transition: 'all 0.3s ease',
                                            border:
                                                selectedTiming === time
                                                    ? '2px solid #dc3545'
                                                    : '2px solid #374151',
                                        }}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>

                            {/* ✅ Seats Availability Info */}
                            <div
                                className="mt-4 p-3 rounded"
                                style={{ backgroundColor: 'rgba(0, 123, 255, 0.1)' }}
                            >
                                <h6 className="text-light mb-2">📊 Seats Status</h6>
                                <div className="d-flex justify-content-between text-light mb-1">
                                    <span className="small">Available:</span>
                                    <span className="small fw-bold text-success">
                                        {seatsCount.available}
                                    </span>
                                </div>
                                <div className="d-flex justify-content-between text-light mb-1">
                                    <span className="small">Booked:</span>
                                    <span className="small fw-bold text-secondary">
                                        {seatsCount.booked}
                                    </span>
                                </div>
                                <div className="d-flex justify-content-between text-light">
                                    <span className="small">Selected:</span>
                                    <span className="small fw-bold text-danger">
                                        {seatsCount.selected}
                                    </span>
                                </div>
                            </div>

                            {/* Selected Seats Summary */}
                            {selectedSeats.length > 0 && (
                                <div
                                    className="mt-4 p-3 rounded"
                                    style={{ backgroundColor: 'rgba(220, 53, 69, 0.1)' }}
                                >
                                    <h6 className="text-light mb-2">✅ Selected Seats</h6>
                                    <div className="d-flex flex-wrap gap-2 mb-3">
                                        {selectedSeats.map((seat) => (
                                            <span
                                                key={seat.id}
                                                className="badge bg-danger"
                                                style={{ fontSize: '12px' }}
                                            >
                                                {seat.id}
                                            </span>
                                        ))}
                                    </div>
                                    <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                                    <div className="d-flex justify-content-between text-light mb-2">
                                        <span className="small">Seats:</span>
                                        <span className="small fw-bold">
                                            {selectedSeats.length}
                                        </span>
                                    </div>
                                    <div className="d-flex justify-content-between text-light mb-2">
                                        <span className="small">Price/Seat:</span>
                                        <span className="small fw-bold">₹{PRICE_PER_SEAT}</span>
                                    </div>
                                    <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                                    <div className="d-flex justify-content-between text-light">
                                        <span className="fw-bold">Total:</span>
                                        <span
                                            className="fw-bold text-danger"
                                            style={{ fontSize: '18px' }}
                                        >
                                            ₹{selectedSeats.length * PRICE_PER_SEAT}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side - Seat Selection */}
                    <div className="col-lg-9">
                        <div className="text-center mb-4">
                            <h3 className="text-light fw-bold">🎫 Select Your Seat</h3>
                            <p className="text-muted small">
                                Gray seats are already booked for this show time
                            </p>
                        </div>

                        {/* Screen */}
                        <div className="mb-5 text-center">
                            <div
                                className="mx-auto rounded-pill position-relative"
                                style={{
                                    width: '80%',
                                    height: '10px',
                                    background:
                                        'linear-gradient(90deg, transparent, #dc3545 20%, #dc3545 80%, transparent)',
                                    boxShadow: '0 5px 15px rgba(220, 53, 69, 0.3)',
                                }}
                            ></div>
                            <p className="text-danger fw-bold mt-2 small">📺 SCREEN SIDE</p>
                        </div>

                        {/* Seat Grid */}
                        <div
                            className="d-flex flex-column gap-2 mb-4 p-4 rounded"
                            style={{ backgroundColor: 'rgba(30, 30, 30, 0.5)' }}
                        >
                            {rows.map((row) => (
                                <div key={row} className="d-flex align-items-center gap-2">
                                    <span
                                        className="text-danger fw-bold"
                                        style={{ width: '30px', fontSize: '14px' }}
                                    >
                                        {row}
                                    </span>

                                    <div className="d-flex gap-1 justify-content-center flex-grow-1">
                                        {seats[row].map((seat, index) => (
                                            <div
                                                key={seat.id}
                                                onClick={() => handleSeatClick(row, index)}
                                                style={getSeatStyle(seat.status)}
                                                title={
                                                    seat.status === 'booked'
                                                        ? `${seat.id} - Already Booked`
                                                        : seat.id
                                                }
                                                onMouseEnter={(e) => {
                                                    if (seat.status === 'available') {
                                                        e.currentTarget.style.backgroundColor =
                                                            '#4b5563';
                                                        e.currentTarget.style.color = '#ffffff';
                                                        e.currentTarget.style.transform =
                                                            'scale(1.1)';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (seat.status === 'available') {
                                                        e.currentTarget.style.backgroundColor =
                                                            '#374151';
                                                        e.currentTarget.style.color = '#9ca3af';
                                                        e.currentTarget.style.transform =
                                                            'scale(1)';
                                                    }
                                                }}
                                            >
                                                {seat.number}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Legend */}
                        <div
                            className="d-flex justify-content-center gap-4 mb-4 p-3 rounded flex-wrap"
                            style={{ backgroundColor: 'rgba(30, 30, 30, 0.5)' }}
                        >
                            <div className="d-flex align-items-center gap-2">
                                <div
                                    style={{
                                        width: '24px',
                                        height: '24px',
                                        backgroundColor: '#374151',
                                        border: '2px solid #4b5563',
                                        borderRadius: '4px',
                                    }}
                                ></div>
                                <span className="text-light small fw-bold">
                                    Available ({seatsCount.available})
                                </span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <div
                                    style={{
                                        width: '24px',
                                        height: '24px',
                                        backgroundColor: '#dc3545',
                                        border: '2px solid #ff4757',
                                        borderRadius: '4px',
                                    }}
                                ></div>
                                <span className="text-light small fw-bold">
                                    Selected ({seatsCount.selected})
                                </span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <div
                                    style={{
                                        width: '24px',
                                        height: '24px',
                                        backgroundColor: '#1f2937',
                                        border: '2px solid #111827',
                                        borderRadius: '4px',
                                        opacity: 0.5,
                                    }}
                                ></div>
                                <span className="text-light small fw-bold">
                                    Booked ({seatsCount.booked})
                                </span>
                            </div>
                        </div>

                        {/* Proceed Button */}
                        <div className="text-center">
                            <button
                                className="btn btn-danger btn-lg rounded-pill px-5 py-3"
                                disabled={selectedSeats.length === 0}
                                onClick={handleProceed}
                                style={{
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    boxShadow:
                                        selectedSeats.length > 0
                                            ? '0 5px 15px rgba(220, 53, 69, 0.4)'
                                            : 'none',
                                    opacity: selectedSeats.length === 0 ? 0.5 : 1,
                                }}
                            >
                                ➡️ Proceed to Checkout
                                {selectedSeats.length > 0 &&
                                    ` (${selectedSeats.length} ${
                                        selectedSeats.length === 1 ? 'seat' : 'seats'
                                    })`}
                            </button>
                            <p className="text-muted small mt-3">
                                Selected seats will be held for 10 minutes
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeatBookings;
