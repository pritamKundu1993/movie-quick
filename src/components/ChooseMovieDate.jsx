import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ChooseMovieDate = ({ movie }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedDate, setSelectedDate] = useState(0);

    // Generate next 7 days
    const generateDates = () => {
        const dates = [];
        const today = new Date();

        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push({
                day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                date: date.getDate(),
                fullDate: date,
            });
        }
        return dates;
    };

    const dates = generateDates();

    // Handle left arrow - go to previous date
    const handlePreviousDate = () => {
        if (selectedDate > 0) {
            setSelectedDate(selectedDate - 1);
        }
    };

    // Handle right arrow - go to next date
    const handleNextDate = () => {
        if (selectedDate < dates.length - 1) {
            setSelectedDate(selectedDate + 1);
        }
    };

    const handleBookNow = () => {
        navigate(`/movie/${id}/booking`, {
            state: {
                movie: movie,
                selectedDate: dates[selectedDate].fullDate,
                dateString: `${dates[selectedDate].day}, ${dates[selectedDate].date}`,
            },
        });
    };

    return (
        <div className="container my-5">
            <div
                className="py-4 px-4 rounded"
                style={{
                    backgroundColor: 'rgba(139, 0, 0, 0.15)',
                    border: '1px solid rgba(139, 0, 0, 0.3)',
                }}
            >
                <div className="row align-items-center">
                    <div className="col-lg-8 mb-3 mb-lg-0">
                        <h5 className="text-light fw-bold mb-3">Choose Date</h5>
                        <div className="d-flex align-items-center justify-content-center gap-4">
                            {/* Left Arrow - Go to Previous Date */}
                            <button
                                className="btn btn-dark rounded-circle"
                                style={{
                                    width: '45px',
                                    height: '45px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    opacity: selectedDate === 0 ? 0.5 : 1,
                                    cursor: selectedDate === 0 ? 'not-allowed' : 'pointer',
                                    marginRight: '10px',
                                }}
                                onClick={handlePreviousDate}
                                disabled={selectedDate === 0}
                            >
                                ⬅️
                            </button>

                            {/* Date Buttons */}
                            <div
                                id="date-container"
                                className="d-flex gap-2 overflow-auto "
                                style={{
                                    scrollBehavior: 'smooth',
                                    scrollbarWidth: 'none',
                                    msOverflowStyle: 'none',
                                }}
                            >
                                {dates.map((date, index) => (
                                    <button
                                        key={index}
                                        className={`btn rounded px-3 py-3 flex-shrink-0 ${
                                            selectedDate === index ? 'btn-danger' : 'btn-dark'
                                        }`}
                                        style={{
                                            minWidth: '70px',
                                            transition: 'all 0.3s ease',
                                            border:
                                                selectedDate === index
                                                    ? 'none'
                                                    : '1px solid rgba(255,255,255,0.1)',
                                        }}
                                        onClick={() => setSelectedDate(index)}
                                    >
                                        <div className="text-center">
                                            <div className="small text-light">{date.day}</div>
                                            <div className="fw-bold text-light">{date.date}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Right Arrow - Go to Next Date */}
                            <button
                                className="btn btn-dark rounded-circle flex-shrink-0"
                                style={{
                                    width: '45px',
                                    height: '45px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    marginLeft: '10px',
                                    opacity: selectedDate === dates.length - 1 ? 0.5 : 1,
                                    cursor:
                                        selectedDate === dates.length - 1
                                            ? 'not-allowed'
                                            : 'pointer',
                                }}
                                onClick={handleNextDate}
                                disabled={selectedDate === dates.length - 1}
                            >
                                ➡️
                            </button>
                        </div>
                    </div>

                    {/* Book Now Button */}
                    <div className="col-lg-4 text-center text-lg-end">
                        <button
                            className="btn btn-danger btn-lg rounded-pill px-5 py-3"
                            onClick={handleBookNow}
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChooseMovieDate;
