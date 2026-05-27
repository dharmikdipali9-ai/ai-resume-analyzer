import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, LayoutDashboard, Zap, Menu, X, FileText, Mic, Layers } from 'lucide-react';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Safely parse user to prevent null pointer crashes if not authenticated
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    const handleLogout = () => {
        localStorage.clear();
        setIsMobileMenuOpen(false);
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-md sticky-top border-bottom py-2">
            <div className="container">
                
                {/* Brand Logo */}
                <Link to="#" className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-5 text-dark" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="brand-mark">
                        <Zap size={16} fill="white" />
                    </div>
                    <span>
                        Resume<span className="app-gradient-text">Analyzer</span>
                    </span>
                </Link>

                {/* Mobile Hamburger Toggle */}
                <button 
                    className="btn btn-link text-dark d-md-none p-1 border-0 shadow-none" 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle navigation"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Menu Grid Layout */}
                <div className="collapse navbar-collapse d-none d-md-flex justify-content-between align-items-center w-100">
                    
                    {/* Left/Middle: Core Page Navigation */}
                    <ul className="navbar-nav me-auto mb-2 mb-md-0 ms-4">
                        {user && (
                            <li className="nav-item">
                                <Link 
                                    className={`nav-link d-flex align-items-center gap-2 px-3 py-2 fw-medium ${location.pathname === '/dashboard' ? 'bg-light text-primary' : 'text-secondary'}`} 
                                    to="/dashboard"
                                >
                                    <LayoutDashboard size={16} />
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                        )}
                        {user && (
                            <>
                                <li className="nav-item">
                                    <Link className={`nav-link d-flex align-items-center gap-2 px-3 py-2 fw-medium ${location.pathname === '/upload-resume' ? 'bg-light text-primary' : 'text-secondary'}`} to="/upload-resume">
                                        <FileText size={16} />
                                        <span>Analyze</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link d-flex align-items-center gap-2 px-3 py-2 fw-medium ${location.pathname === '/resume-builder' ? 'bg-light text-primary' : 'text-secondary'}`} to="/resume-builder">
                                        <Layers size={16} />
                                        <span>Builder</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link d-flex align-items-center gap-2 px-3 py-2 fw-medium ${location.pathname === '/mock-interview' ? 'bg-light text-primary' : 'text-secondary'}`} to="/mock-interview">
                                        <Mic size={16} />
                                        <span>Interview</span>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Right Hand Profile Actions */}
                    <div className="d-flex align-items-center gap-3">
                        {user ? (
                            <>
                                {/* User Pill Display */}
                                <div className="d-flex align-items-center gap-2 bg-white border rounded-pill py-1 pe-3 ps-1 shadow-sm">
                                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold fs-7" style={{ width: '28px', height: '28px' }}>
                                        {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <span className="small text-dark fw-medium">{user?.username}</span>
                                </div>

                                {/* Logout Action */}
                                <button className="btn btn-outline-danger d-flex align-items-center gap-2 btn-sm px-3 py-2" onClick={handleLogout}>
                                    <LogOut size={14} />
                                    <span>Sign Out</span>
                                </button>
                            </>
                        ) : (
                            <div className="d-flex align-items-center gap-2">
                                <Link className="btn btn-link text-secondary text-decoration-none fw-medium" to="/login">Sign In</Link>
                                <Link className="btn btn-dark fw-medium px-3" to="/register">Get Started</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bootstrap-friendly Mobile Slide Down Panel */}
            {isMobileMenuOpen && (
                <div className="w-100 bg-white border-top d-md-none position-absolute start-0 end-0 px-3 py-4 shadow-lg" style={{ top: '56px', zIndex: 999 }}>
                    {user ? (
                        <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-center gap-3 bg-light p-3 rounded-3">
                                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold fs-5" style={{ width: '44px', height: '44px' }}>
                                    {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <div className="d-flex flex-column">
                                    <span className="fw-semibold text-dark">{user?.username}</span>
                                    <span className="small text-muted">User Account</span>
                                </div>
                            </div>
                            
                                <Link 
                                    className={`nav-link d-flex align-items-center gap-3 p-3 rounded-3 fw-medium ${location.pathname === '/dashboard' ? 'bg-light text-primary' : 'text-dark'}`} 
                                to="/dashboard"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <LayoutDashboard size={18} />
                                <span>Dashboard</span>
                            </Link>
                            <Link className={`nav-link d-flex align-items-center gap-3 p-3 rounded-3 fw-medium ${location.pathname === '/upload-resume' ? 'bg-light text-primary' : 'text-dark'}`} to="/upload-resume" onClick={() => setIsMobileMenuOpen(false)}>
                                <FileText size={18} />
                                <span>Analyze</span>
                            </Link>
                            <Link className={`nav-link d-flex align-items-center gap-3 p-3 rounded-3 fw-medium ${location.pathname === '/resume-builder' ? 'bg-light text-primary' : 'text-dark'}`} to="/resume-builder" onClick={() => setIsMobileMenuOpen(false)}>
                                <Layers size={18} />
                                <span>Builder</span>
                            </Link>
                            <Link className={`nav-link d-flex align-items-center gap-3 p-3 rounded-3 fw-medium ${location.pathname === '/mock-interview' ? 'bg-light text-primary' : 'text-dark'}`} to="/mock-interview" onClick={() => setIsMobileMenuOpen(false)}>
                                <Mic size={18} />
                                <span>Interview</span>
                            </Link>

                            <button className="btn btn-danger-subtle text-danger w-100 py-2.5 d-flex align-items-center justify-content-center gap-2 border" onClick={handleLogout}>
                                <LogOut size={18} />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    ) : (
                        <div className="d-flex flex-column gap-2">
                            <Link className="btn btn-outline-secondary w-100 py-2 fw-medium" to="/login" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                            <Link className="btn btn-dark w-100 py-2 fw-medium" to="/register" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;
