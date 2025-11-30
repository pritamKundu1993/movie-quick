import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="text-light pt-5 pb-4" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="container">
                <div className="row">
                    {/* Brand and Description */}
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="mb-3">
                            <img src={logo} alt="QuickShow Logo" height="35" className="me-2" />
                        </div>
                        <p className="text-muted">
                            Your ultimate destination for booking movie tickets online. Experience
                            the magic of cinema with QuickShow.
                        </p>
                        {/* Social Media Icons */}
                        <div className="d-flex gap-3 mt-3">
                            <a
                                href="#"
                                className="text-light"
                                style={{ transition: 'color 0.3s' }}
                                onMouseEnter={(e) => (e.target.style.color = '#dc3545')}
                                onMouseLeave={(e) => (e.target.style.color = '#fff')}
                            >
                                <i className="bi bi-facebook fs-5"></i>
                            </a>
                            <a
                                href="#"
                                className="text-light"
                                style={{ transition: 'color 0.3s' }}
                                onMouseEnter={(e) => (e.target.style.color = '#dc3545')}
                                onMouseLeave={(e) => (e.target.style.color = '#fff')}
                            >
                                <i className="bi bi-twitter fs-5"></i>
                            </a>
                            <a
                                href="#"
                                className="text-light"
                                style={{ transition: 'color 0.3s' }}
                                onMouseEnter={(e) => (e.target.style.color = '#dc3545')}
                                onMouseLeave={(e) => (e.target.style.color = '#fff')}
                            >
                                <i className="bi bi-instagram fs-5"></i>
                            </a>
                            <a
                                href="#"
                                className="text-light"
                                style={{ transition: 'color 0.3s' }}
                                onMouseEnter={(e) => (e.target.style.color = '#dc3545')}
                                onMouseLeave={(e) => (e.target.style.color = '#fff')}
                            >
                                <i className="bi bi-youtube fs-5"></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-lg-2 col-md-6 mb-4">
                        <h5 className="fw-bold mb-3">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link
                                    to="/"
                                    className="text-muted text-decoration-none"
                                    style={{ transition: 'color 0.3s' }}
                                    onMouseEnter={(e) => (e.target.style.color = '#dc3545')}
                                    onMouseLeave={(e) => (e.target.style.color = '#6c757d')}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    to="/movies"
                                    className="text-muted text-decoration-none"
                                    style={{ transition: 'color 0.3s' }}
                                    onMouseEnter={(e) => (e.target.style.color = '#dc3545')}
                                    onMouseLeave={(e) => (e.target.style.color = '#6c757d')}
                                >
                                    Movies
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    to="/theatres"
                                    className="text-muted text-decoration-none"
                                    style={{ transition: 'color 0.3s' }}
                                    onMouseEnter={(e) => (e.target.style.color = '#dc3545')}
                                    onMouseLeave={(e) => (e.target.style.color = '#6c757d')}
                                >
                                    Theatres
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    to="/releases"
                                    className="text-muted text-decoration-none"
                                    style={{ transition: 'color 0.3s' }}
                                    onMouseEnter={(e) => (e.target.style.color = '#dc3545')}
                                    onMouseLeave={(e) => (e.target.style.color = '#6c757d')}
                                >
                                    Releases
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="col-lg-2 col-md-6 mb-4">
                        <h5 className="fw-bold mb-3">Company</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a
                                    href="#"
                                    className="text-muted text-decoration-none"
                                    style={{ transition: 'color 0.3s' }}
                                    onMouseEnter={(e) => (e.target.style.color = '#dc3545')}
                                    onMouseLeave={(e) => (e.target.style.color = '#6c757d')}
                                >
                                    About Us
                                </a>
                            </li>
                            <li className="mb-2">
                                <a
                                    href="#"
                                    className="text-muted text-decoration-none"
                                    style={{ transition: 'color 0.3s' }}
                                    onMouseEnter={(e) => (e.target.style.color = '#dc3545')}
                                    onMouseLeave={(e) => (e.target.style.color = '#6c757d')}
                                >
                                    Careers
                                </a>
                            </li>
                            <li className="mb-2">
                                <a
                                    href="#"
                                    className="text-muted text-decoration-none"
                                    style={{ transition: 'color 0.3s' }}
                                    onMouseEnter={(e) => (e.target.style.color = '#dc3545')}
                                    onMouseLeave={(e) => (e.target.style.color = '#6c757d')}
                                >
                                    Press
                                </a>
                            </li>
                            <li className="mb-2">
                                <a
                                    href="#"
                                    className="text-muted text-decoration-none"
                                    style={{ transition: 'color 0.3s' }}
                                    onMouseEnter={(e) => (e.target.style.color = '#dc3545')}
                                    onMouseLeave={(e) => (e.target.style.color = '#6c757d')}
                                >
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="col-lg-2 col-md-6 mb-4">
                        <h5 className="fw-bold mb-3">Support</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a
                                    href="#"
                                    className="text-muted text-decoration-none"
                                    style={{ transition: 'color 0.3s' }}
                                    onMouseEnter={(e) => (e.target.style.color = '#dc3545')}
                                    onMouseLeave={(e) => (e.target.style.color = '#6c757d')}
                                >
                                    Help Center
                                </a>
                            </li>
                            <li className="mb-2">
                                <a
                                    href="#"
                                    className="text-muted text-decoration-none"
                                    style={{ transition: 'color 0.3s' }}
                                    onMouseEnter={(e) => (e.target.style.color = '#dc3545')}
                                    onMouseLeave={(e) => (e.target.style.color = '#6c757d')}
                                >
                                    Contact Us
                                </a>
                            </li>
                            <li className="mb-2">
                                <a
                                    href="#"
                                    className="text-muted text-decoration-none"
                                    style={{ transition: 'color 0.3s' }}
                                    onMouseEnter={(e) => (e.target.style.color = '#dc3545')}
                                    onMouseLeave={(e) => (e.target.style.color = '#6c757d')}
                                >
                                    FAQs
                                </a>
                            </li>
                            <li className="mb-2">
                                <a
                                    href="#"
                                    className="text-muted text-decoration-none"
                                    style={{ transition: 'color 0.3s' }}
                                    onMouseEnter={(e) => (e.target.style.color = '#dc3545')}
                                    onMouseLeave={(e) => (e.target.style.color = '#6c757d')}
                                >
                                    Feedback
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="col-lg-2 col-md-6 mb-4">
                        <h5 className="fw-bold mb-3">Newsletter</h5>
                        <p className="text-muted small">
                            Subscribe to get updates on new releases and special offers.
                        </p>
                        <form className="mt-3">
                            <div className="input-group mb-2">
                                <input
                                    type="email"
                                    className="form-control bg-dark border-secondary text-light"
                                    placeholder="Your email"
                                    style={{ fontSize: '14px' }}
                                />
                            </div>
                            <button type="submit" className="btn btn-danger btn-sm w-100">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <hr className="border-secondary my-4" />

                {/* Bottom Section */}
                <div className="row align-items-center">
                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        <p className="text-muted mb-0 small">
                            © {currentYear} QuickShow. All rights reserved.
                        </p>
                    </div>
                    <div className="col-md-6 text-center text-md-end">
                        <a
                            href="#"
                            className="text-muted text-decoration-none small me-3"
                            style={{ transition: 'color 0.3s' }}
                            onMouseEnter={(e) => (e.target.style.color = '#dc3545')}
                            onMouseLeave={(e) => (e.target.style.color = '#6c757d')}
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="text-muted text-decoration-none small me-3"
                            style={{ transition: 'color 0.3s' }}
                            onMouseEnter={(e) => (e.target.style.color = '#dc3545')}
                            onMouseLeave={(e) => (e.target.style.color = '#6c757d')}
                        >
                            Terms of Service
                        </a>
                        <a
                            href="#"
                            className="text-muted text-decoration-none small"
                            style={{ transition: 'color 0.3s' }}
                            onMouseEnter={(e) => (e.target.style.color = '#dc3545')}
                            onMouseLeave={(e) => (e.target.style.color = '#6c757d')}
                        >
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
