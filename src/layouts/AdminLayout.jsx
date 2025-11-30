import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAUth';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div
            style={{
                display: 'flex',
                minHeight: '100vh',
                backgroundColor: '#0a0a0a',
            }}
        >
            {/* Sidebar */}
            <aside
                style={{
                    width: '250px',
                    backgroundColor: '#1a1a1a',
                    borderRight: '1px solid #2a2a2a',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'fixed',
                    height: '100vh',
                    left: 0,
                    top: 0,
                }}
            >
                {/* Logo */}
                <div
                    style={{
                        padding: '25px 20px',
                        borderBottom: '1px solid #2a2a2a',
                    }}
                >
                    <h3 className="text-light fw-bold mb-0">
                        <span className="text-danger">Q</span>uickShow
                    </h3>
                </div>

                {/* User Profile */}
                <div
                    style={{
                        padding: '25px 20px',
                        borderBottom: '1px solid #2a2a2a',
                        textAlign: 'center',
                    }}
                >
                    <img
                        src={user?.avatar}
                        alt={user?.name}
                        style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '50%',
                            border: '3px solid #dc3545',
                            marginBottom: '10px',
                        }}
                    />
                    <div className="text-light fw-bold">{user?.name}</div>
                    <small className="text-muted">Administrator</small>
                </div>

                {/* Navigation Menu */}
                <nav style={{ flex: 1, padding: '20px 0' }}>
                    <Link
                        to="/admin/dashboard"
                        className="text-decoration-none"
                        style={{
                            display: 'block',
                            padding: '15px 20px',
                            color:
                                isActive('/admin/dashboard') || isActive('/admin')
                                    ? '#fff'
                                    : '#999',
                            backgroundColor:
                                isActive('/admin/dashboard') || isActive('/admin')
                                    ? 'rgba(220, 53, 69, 0.15)'
                                    : 'transparent',
                            borderLeft:
                                isActive('/admin/dashboard') || isActive('/admin')
                                    ? '4px solid #dc3545'
                                    : '4px solid transparent',
                            fontWeight: '500',
                            transition: 'all 0.3s',
                        }}
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/admin/add-shows"
                        className="text-decoration-none"
                        style={{
                            display: 'block',
                            padding: '15px 20px',
                            color: isActive('/admin/add-shows') ? '#fff' : '#999',
                            backgroundColor: isActive('/admin/add-shows')
                                ? 'rgba(220, 53, 69, 0.15)'
                                : 'transparent',
                            borderLeft: isActive('/admin/add-shows')
                                ? '4px solid #dc3545'
                                : '4px solid transparent',
                            fontWeight: '500',
                            transition: 'all 0.3s',
                        }}
                    >
                        Add Shows
                    </Link>

                    <Link
                        to="/admin/list-shows"
                        className="text-decoration-none"
                        style={{
                            display: 'block',
                            padding: '15px 20px',
                            color: isActive('/admin/list-shows') ? '#fff' : '#999',
                            backgroundColor: isActive('/admin/list-shows')
                                ? 'rgba(220, 53, 69, 0.15)'
                                : 'transparent',
                            borderLeft: isActive('/admin/list-shows')
                                ? '4px solid #dc3545'
                                : '4px solid transparent',
                            fontWeight: '500',
                            transition: 'all 0.3s',
                        }}
                    >
                        List Shows
                    </Link>

                    <Link
                        to="/admin/list-bookings"
                        className="text-decoration-none"
                        style={{
                            display: 'block',
                            padding: '15px 20px',
                            color: isActive('/admin/list-bookings') ? '#fff' : '#999',
                            backgroundColor: isActive('/admin/list-bookings')
                                ? 'rgba(220, 53, 69, 0.15)'
                                : 'transparent',
                            borderLeft: isActive('/admin/list-bookings')
                                ? '4px solid #dc3545'
                                : '4px solid transparent',
                            fontWeight: '500',
                            transition: 'all 0.3s',
                        }}
                    >
                        List Bookings
                    </Link>
                </nav>

                {/* Logout Button */}
                <div style={{ padding: '20px', borderTop: '1px solid #2a2a2a' }}>
                    <button
                        onClick={handleLogout}
                        className="btn btn-outline-danger w-100 rounded-pill"
                    >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
                    </button>
                    <Link to="/" className="btn btn-outline-secondary w-100 rounded-pill mt-2">
                        🏠 Main Site
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main
                style={{
                    marginLeft: '250px',
                    flex: 1,
                    padding: '30px',
                    backgroundColor: '#0f0f0f',
                    minHeight: '100vh',
                }}
            >
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
