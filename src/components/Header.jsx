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
            className="navbar navbar-expand-lg navbar-dark position-absolute top-0 w-100 py-3"
            style={{
                backgroundColor: 'transparent',
                zIndex: 1030,
            }}
        >
            <div className="container d-flex justify-content-between align-items-center">
                {/* Logo */}
                <Link className="navbar-brand fw-bold text-light fs-3" to="/">
                    <img src={logo} alt="QuickShow Logo" height="35" className="me-2" />
                </Link>

                {/* Navbar links */}
                <div className="d-none d-lg-flex align-items-center">
                    <ul className="navbar-nav me-4 mb-0">
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

                        {/* Show My Bookings only when authenticated */}
                        {isAuthenticated && (
                            <li className="nav-item">
                                <Link className="nav-link text-light px-3" to="/my-bookings">
                                    🎟️ My Bookings
                                </Link>
                            </li>
                        )}

                        {/* Show Admin link only for admin users */}
                        {isAuthenticated && isAdmin() && (
                            <li className="nav-item">
                                <Link className="nav-link text-warning px-3" to="/admin">
                                    <i className="bi bi-speedometer2 me-1"></i>
                                    Admin
                                </Link>
                            </li>
                        )}
                    </ul>

                    {/* Authentication Section */}
                    {isAuthenticated ? (
                        <div className="d-flex align-items-center gap-3">
                            {/* User Avatar & Name */}
                            <div className="d-flex align-items-center justify-content-center gap-2">
                                <img
                                    src={user?.avatar}
                                    alt={user?.name}
                                    className="rounded-circle me-2"
                                    width="40"
                                    height="40"
                                    style={{ border: '2px solid #dc3545' }}
                                />
                                <div className="text-light">
                                    <div
                                        className="fw-bold"
                                        style={{ fontSize: '14px', marginRight: '4px' }}
                                    >
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

                            {/* Logout Button */}
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
            </div>
        </nav>
    );
};

export default Header;
