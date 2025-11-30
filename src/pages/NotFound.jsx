import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div
            className="d-flex align-items-center justify-content-center text-light"
            style={{
                minHeight: '100vh',
                backgroundColor: '#0a0a0a',
                padding: '20px',
            }}
        >
            <div className="text-center">
                {/* 404 Large Text */}
                <h1 className="display-1 fw-bold text-danger mb-4" style={{ fontSize: '150px' }}>
                    404
                </h1>

                {/* Error Message */}
                <h2 className="mb-3">Page Not Found</h2>
                <p className="text-muted mb-4 lead">
                    Oops! The page you're looking for doesn't exist.
                </p>

                {/* Icon */}
                <div className="mb-4">
                    <i className="bi bi-film text-danger" style={{ fontSize: '80px' }}></i>
                </div>

                {/* Action Buttons */}
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                    <Link to="/" className="btn btn-danger btn-lg rounded-pill px-5">
                        <i className="bi bi-house-door me-2"></i>
                        Back to Home
                    </Link>
                </div>

                {/* Additional Help Text */}
                <p className="text-muted mt-5 small">
                    If you think this is a mistake, please{' '}
                    <a href="#" className="text-danger text-decoration-none">
                        contact support
                    </a>
                </p>
            </div>
        </div>
    );
};

export default NotFound;
