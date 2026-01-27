import { Link, useNavigate } from 'react-router-dom';

import logo from '../assets/logo.png';
import { useAuth } from '../hooks/useAUth';

const Header = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout, isAdmin } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav
            className="navbar navbar-dark position-absolute top-0 w-100 py-3"
            style={{
                backgroundColor: 'transparent',
                zIndex: 1030,
            }}
        >
            <div className="container">
                {/* Logo */}
                <Link className="navbar-brand fw-bold text-light fs-3" to="/">
                    <img src={logo} alt="QuickShow Logo" height="35" className="me-2" />
                </Link>

                {/* Mobile Toggle Button (Bootstrap 4) */}
                <button
                    className="navbar-toggler border-0 d-lg-none"
                    type="button"
                    data-toggle="collapse"
                    data-target="#mobileNavbar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* ================= DESKTOP NAVBAR ================= */}
                <div className="d-none d-lg-flex align-items-center ms-auto">
                    <ul className="navbar-nav me-4 mb-0 flex-row">
                        <li className="nav-item">
                            <Link className="nav-link text-light px-3" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light px-3" to="/top-rated">
                                Top Rated
                            </Link>
                        </li>

                        {isAuthenticated && (
                            <li className="nav-item">
                                <Link className="nav-link text-light px-3" to="/my-bookings">
                                    🎟️ My Bookings
                                </Link>
                            </li>
                        )}

                        {isAuthenticated && isAdmin() && (
                            <li className="nav-item">
                                <Link className="nav-link text-warning px-3" to="/admin">
                                    Admin
                                </Link>
                            </li>
                        )}
                    </ul>

                    {isAuthenticated ? (
                        <div className="d-flex align-items-center gap-3">
                            <div className="d-flex align-items-center gap-2">
                                <img
                                    src={user?.avatar}
                                    alt={user?.name}
                                    className="rounded-circle"
                                    width="40"
                                    height="40"
                                    style={{ border: '2px solid #dc3545' }}
                                />
                                <div className="text-light">
                                    <div className="fw-bold" style={{ fontSize: '14px' }}>
                                        {user?.name}
                                    </div>
                                    <div
                                        className="text-primary"
                                        style={{ fontSize: '11px', fontWeight: 'bold' }}
                                    >
                                        {user?.role === 'admin' ? 'Administrator' : 'User'}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="btn btn-outline-danger px-4 rounded-pill"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-danger px-4 rounded-pill">
                            Log In
                        </Link>
                    )}
                </div>

                {/* ================= MOBILE NAVBAR ================= */}
                <div
                    className="collapse navbar-collapse d-lg-none mt-3 p-3 rounded"
                    id="mobileNavbar"
                    style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
                >
                    <ul className="navbar-nav text-center">
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/top-rated">
                                Top Rated
                            </Link>
                        </li>

                        {isAuthenticated && (
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/my-bookings">
                                    🎟️ My Bookings
                                </Link>
                            </li>
                        )}

                        {isAuthenticated && isAdmin() && (
                            <li className="nav-item">
                                <Link className="nav-link text-warning" to="/admin">
                                    Admin Dashboard
                                </Link>
                            </li>
                        )}

                        <li className="nav-item mt-3">
                            {isAuthenticated ? (
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-outline-danger w-100 rounded-pill"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link to="/login" className="btn btn-danger w-100 rounded-pill">
                                    Log In
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
