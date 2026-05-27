import { Link } from 'react-router-dom'
import { FileText, Mic, Sparkles, History, Target, ShieldCheck, TrendingUp, ArrowRight, BarChart3 } from 'lucide-react'
import Navbar from '../components/Navbar'

function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user'))

    return (
        <div className="app-page d-flex flex-column" style={{ minHeight: '100vh' }}>
            <Navbar />

            <div className="container py-5 my-auto">
                <section className="hero-panel p-4 p-lg-5 mb-4">
                    <div className="row align-items-center g-4 position-relative" style={{ zIndex: 1 }}>
                        <div className="col-lg-7">
                            <span className="badge rounded-pill px-3 py-2 mb-3 fw-semibold" style={{ background: 'rgba(255,255,255,.16)', color: '#fff', border: '1px solid rgba(255,255,255,.22)' }}>
                                AI Career Command Center
                            </span>
                            <h1 className="display-5 fw-bold mb-3">Welcome back, {user?.username || 'User'}.</h1>
                            <p className="lead mb-0" style={{ color: 'rgba(255,255,255,.76)', maxWidth: '680px' }}>
                                Analyze resumes, generate tailored versions, and practice interviews from one polished workspace.
                            </p>
                        </div>
                        <div className="col-lg-5">
                            <div className="row g-3">
                                <div className="col-6">
                                    <div className="metric-card p-3">
                                        <BarChart3 size={20} className="mb-2" />
                                        <div className="h3 fw-bold mb-0">ATS</div>
                                        <small style={{ color: 'rgba(255,255,255,.72)' }}>Scoring engine</small>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="metric-card p-3">
                                        <ShieldCheck size={20} className="mb-2" />
                                        <div className="h3 fw-bold mb-0">PDF</div>
                                        <small style={{ color: 'rgba(255,255,255,.72)' }}>Secure upload</small>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="metric-card p-3">
                                        <Target size={20} className="mb-2" />
                                        <div className="h3 fw-bold mb-0">Role</div>
                                        <small style={{ color: 'rgba(255,255,255,.72)' }}>Targeted prep</small>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="metric-card p-3">
                                        <TrendingUp size={20} className="mb-2" />
                                        <div className="h3 fw-bold mb-0">AI</div>
                                        <small style={{ color: 'rgba(255,255,255,.72)' }}>Career coach</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Balanced Grid Items */}
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    {/* Card: Upload */}
                    <div className="col">
                        <div className="action-card h-100">
                            <div className="card-body p-4 d-flex flex-column align-items-start">
                                <div className="action-icon mb-3">
                                    <FileText size={24} />
                                </div>
                                <h5 className="fw-bold text-dark mb-2">Upload Resume</h5>
                                <p className="text-muted small mb-4 flex-grow-1">Upload a PDF and convert it into a structured profile with ATS insights, extracted skills, and report-ready feedback.</p>
                                <Link to="/upload-resume" className="btn btn-outline-dark w-100 py-2 fw-semibold small mt-auto d-flex align-items-center justify-content-center gap-2">
                                    Upload Now <ArrowRight size={15} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Card: Mock Interview (Featured Gradient) */}
                    <div className="col">
                        <div className="action-card h-100">
                            <div className="card-body p-4 d-flex flex-column align-items-start">
                                <div className="action-icon mb-3">
                                    <Mic size={24} />
                                </div>
                                <h5 className="fw-bold text-dark mb-2">Mock Interview</h5>
                                <p className="text-muted small mb-4 flex-grow-1">Practice role-specific interview conversations with voice input, AI follow-ups, and real-time coaching support.</p>
                                <Link to="/mock-interview" className="btn btn-outline-dark w-100 py-2 fw-semibold small mt-auto d-flex align-items-center justify-content-center gap-2">
                                    Start Session <ArrowRight size={15} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Card: AI Resume Builder */}
                    <div className="col">
                        <div className="action-card h-100">
                            <div className="card-body p-4 d-flex flex-column align-items-start">
                                <div className="action-icon mb-3">
                                    <Sparkles size={24} />
                                </div>
                                <h5 className="fw-bold text-dark mb-2">AI Resume Builder</h5>
                                <p className="text-muted small mb-4 flex-grow-1">Create polished resume variants with structured sections, templates, AI refinement, and downloadable output.</p>
                                <Link to="/resume-builder" className="btn btn-outline-primary w-100 py-2 fw-semibold small mt-auto d-flex align-items-center justify-content-center gap-2">
                                    Build Resume <ArrowRight size={15} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Card: History */}
                    <div className="col">
                        <div className="action-card h-100">
                            <div className="card-body p-4 d-flex flex-column align-items-start">
                                <div className="action-icon mb-3">
                                    <History size={24} />
                                </div>
                                <h5 className="fw-bold text-dark mb-2">History</h5>
                                <p className="text-muted small mb-4 flex-grow-1">Review previous uploads, compare resume scores, and reopen detailed reports when you need them.</p>
                                <Link to="/my-resumes" className="btn btn-outline-dark w-100 py-2 fw-semibold small mt-auto d-flex align-items-center justify-content-center gap-2">
                                    View Reports <ArrowRight size={15} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard
