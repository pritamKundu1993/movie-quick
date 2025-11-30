import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAUth';

const Login = () => {
    const navigate = useNavigate();
    const { login, isAuthenticated, user } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isAuthenticated && user) {
            if (user.role === 'admin') {
                navigate('/admin/dashboard', { replace: true });
            } else {
                navigate('/', { replace: true });
            }
        }
    }, [isAuthenticated, user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const result = login(email, password);

        if (result.success) {
            result.user.role === 'admin' ? navigate('/admin/dashboard') : navigate('/');
        } else {
            setError('User not found! Invalid email or password.');
        }
    };

    // Eye Open Icon
    const EyeOpenIcon = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        </svg>
    );

    // Eye Closed Icon
    const EyeClosedIcon = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
    );

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
            <div style={{ maxWidth: '400px', width: '100%', padding: '20px' }}>
                <div
                    style={{
                        backgroundColor: '#1a1a1a',
                        padding: '40px',
                        borderRadius: '10px',
                        border: '1px solid #333',
                    }}
                >
                    <h2 className="text-light text-center mb-4">Login</h2>

                    {error && <div className="alert alert-danger mb-3">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    backgroundColor: '#0a0a0a',
                                    border: '1px solid #333',
                                    color: '#fff',
                                }}
                            />
                        </div>

                        <div className="mb-3 position-relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    backgroundColor: '#0a0a0a',
                                    border: '1px solid #333',
                                    color: '#fff',
                                    paddingRight: '45px',
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '5px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    outline: 'none',
                                }}
                            >
                                {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                            </button>
                        </div>

                        <button type="submit" className="btn btn-danger w-100">
                            Sign In
                        </button>
                    </form>
                    <Link to={'/'} className="text-center">
                        Home page
                    </Link>
                    <div className="mt-3 text-muted text-center small">
                        <div>Admin: admin@movie.com / admin123</div>
                        <div>User: john@movie.com / john123</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
