import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAUth';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
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
                    <p className="text-light mt-3">Verifying authentication...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
