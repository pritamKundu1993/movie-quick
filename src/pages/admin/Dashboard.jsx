import { useState, useEffect } from 'react';
import { API_OPTIONS, IMAGE_CDN } from '../../utils/constants';
import { USERS } from '../../data/Users';
import LoadingComponents from '../../components/LoadingComponents';
import StatCard from '../../components/StatCard';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalBookings: 0,
        totalRevenue: 0,
        activeMovies: 0,
        totalUsers: 0,
    });

    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        // ✅ Load bookings from localStorage
        const storedBookings = JSON.parse(localStorage.getItem('movieBookings') || '[]');

        // ✅ Calculate stats
        const totalBookings = storedBookings.length;
        const confirmedBookings = storedBookings.filter((b) => b.status === 'confirmed');
        const totalRevenue = confirmedBookings.reduce((sum, b) => sum + b.totalAmount, 0);

        // ✅ Active (unique) movies
        const uniqueMovies = [...new Set(storedBookings.map((b) => b.movieId))];
        const activeMovies = uniqueMovies.length;

        // ✅ Count only users with role "user"
        const totalUsers = USERS.filter((u) => u.role === 'user').length;

        setStats({
            totalBookings,
            totalRevenue,
            activeMovies,
            totalUsers,
        });

        await fetchNowPlayingMovies();
        setLoading(false);
    };

    const fetchNowPlayingMovies = async () => {
        try {
            const response = await fetch(
                'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
                API_OPTIONS
            );
            const data = await response.json();
            setNowPlayingMovies(data.results.slice(0, 3));
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    if (loading) {
        return <LoadingComponents />;
    }

    return (
        <div>
            {/* Header */}
            <div className="mb-4">
                <h2 className="text-light fw-bold">
                    Admin <span className="text-danger">Dashboard</span>
                </h2>
            </div>

            {/* Stats Cards */}
            <div className="row mb-5">
                <StatCard
                    title="Total Bookings"
                    value={stats.totalBookings}
                    emoji="🎫"
                    bg="rgba(220, 53, 69, 0.1)"
                    border="rgba(220, 53, 69, 0.3)"
                />
                <StatCard
                    title="Total Revenue"
                    value={`₹${stats.totalRevenue}`}
                    emoji="💰"
                    bg="rgba(0, 123, 255, 0.1)"
                    border="rgba(0, 123, 255, 0.3)"
                />
                <StatCard
                    title="Active Movies"
                    value={stats.activeMovies}
                    emoji="🎬"
                    bg="rgba(255, 193, 7, 0.1)"
                    border="rgba(255, 193, 7, 0.3)"
                />
                <StatCard
                    title="Total Users"
                    value={stats.totalUsers}
                    emoji="👥"
                    bg="rgba(25, 135, 84, 0.1)"
                    border="rgba(25, 135, 84, 0.3)"
                />
            </div>

            {/* Active Movies from TMDB */}
            <div>
                <h4 className="text-light fw-bold mb-4">Active Movies</h4>
                <div className="row">
                    {nowPlayingMovies.map((movie) => (
                        <div key={movie.id} className="col-lg-4 col-md-6 mb-4">
                            <div
                                className="rounded overflow-hidden"
                                style={{
                                    backgroundColor: '#1a1a1a',
                                    border: '1px solid #2a2a2a',
                                    transition: 'transform 0.3s',
                                    cursor: 'pointer',
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.transform = 'translateY(-5px)')
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.transform = 'translateY(0)')
                                }
                            >
                                <img
                                    src={
                                        movie.poster_path
                                            ? `${IMAGE_CDN}${movie.poster_path}`
                                            : 'https://via.placeholder.com/300x450?text=No+Image'
                                    }
                                    alt={movie.title}
                                    className="w-100"
                                    style={{ height: '400px', objectFit: 'cover' }}
                                />
                                <div className="p-3">
                                    <h6
                                        className="text-light mb-2"
                                        style={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {movie.title}
                                    </h6>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="text-light fw-bold">₹150</span>
                                        <span className="text-danger">
                                            ⭐{' '}
                                            {movie.vote_average
                                                ? movie.vote_average.toFixed(1)
                                                : 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
