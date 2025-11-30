import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAUth';

const AdminPrivateRoute = ({ children }) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div
                style={{
                    backgroundColor: '#0a0a0a',
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div className="text-center">
                    <div
                        className="spinner-border text-danger"
                        role="status"
                        style={{ width: '3rem', height: '3rem' }}
                    >
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-light mt-3">Verifying admin access...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!isAdmin()) {
        return (
            <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', paddingTop: '100px' }}>
                <div className="container text-center py-5">
                    🛡️
                    <h2 className="text-light mt-4 fw-bold">Access Denied</h2>
                    <p className="text-muted lead">You don't have administrator privileges.</p>
                    <Link to={'/'} className="btn btn-danger rounded-pill px-5">
                        🏠 Go to Home
                    </Link>
                </div>
            </div>
        );
    }

    return children;
};

export default AdminPrivateRoute;
