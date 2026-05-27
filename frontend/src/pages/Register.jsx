import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { User, Mail, Lock, UserPlus, ArrowRight, Sparkles, FileText, BarChart3, MessageSquareQuote } from 'lucide-react'
import API from '../api/axios'

function Register() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await API.post('/users/register/', formData)
            alert(response.data.message || 'Account created successfully!')
            navigate('/')
        } catch (error) {
            console.error(error)
            alert(error.response?.data?.error || 'Registration failed')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="auth-page app-page d-flex flex-column overflow-hidden">
            <div className="auth-shell auth-shell-compact py-4">
                <div className="auth-frame row g-0 align-items-stretch">
                    <div className="col-lg-6 d-none d-lg-block">
                        <section className="auth-visual h-100">
                            <div className="brand-mark mb-4">
                                <Sparkles size={18} />
                            </div>
                            <span className="auth-kicker">AI Career Workspace</span>
                            <h1 className="auth-title mt-3 mb-3">Turn your profile into a polished job-ready resume.</h1>
                            <p className="auth-copy mb-4">
                                Create an account to unlock ATS analysis, AI resume generation, and interview practice.
                            </p>
                            <div className="auth-preview">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div>
                                        <small>Profile readiness</small>
                                        <strong>92%</strong>
                                    </div>
                                    <BarChart3 size={24} />
                                </div>
                                <div className="auth-progress mb-4"><span style={{ width: '92%' }}></span></div>
                                <div className="row g-3">
                                    <div className="col-6">
                                        <div className="auth-mini-card">
                                            <FileText size={18} />
                                            <span>Smart Builder</span>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="auth-mini-card">
                                            <MessageSquareQuote size={18} />
                                            <span>AI Coaching</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="col-12 col-lg-6">
                        <section className="auth-form-panel">
                            <div className="text-center text-lg-start mb-3">
                                <div className="d-inline-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-4 mb-3 shadow-sm" style={{ width: '48px', height: '48px' }}>
                                    <UserPlus size={23} strokeWidth={2} />
                                </div>
                                <h2 className="fw-bold text-dark mb-2">Create account</h2>
                                <p className="text-muted mb-0">Start building a stronger resume today.</p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label small fw-semibold text-secondary">Username</label>
                                    <div className="input-group">
                                        <span className="input-group-text premium-input text-secondary border-end-0">
                                            <User size={16} />
                                        </span>
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="johndoe"
                                            className="form-control premium-input border-start-0 ps-1 py-3 shadow-none"
                                            onChange={handleChange}
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label small fw-semibold text-secondary">Email address</label>
                                    <div className="input-group">
                                        <span className="input-group-text premium-input text-secondary border-end-0">
                                            <Mail size={16} />
                                        </span>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="name@example.com"
                                            className="form-control premium-input border-start-0 ps-1 py-3 shadow-none"
                                            onChange={handleChange}
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label small fw-semibold text-secondary mb-1">Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text premium-input text-secondary border-end-0">
                                            <Lock size={16} />
                                        </span>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            className="form-control premium-input border-start-0 ps-1 py-3 shadow-none"
                                            onChange={handleChange}
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 py-3 fw-semibold d-flex align-items-center justify-content-center gap-2 shadow-sm"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                        <>
                                            Get Started <ArrowRight size={16} />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="text-center mt-3 pt-2">
                                <p className="text-muted small mb-0">
                                    Already have an account? <Link to="/" className="text-primary fw-bold text-decoration-none ms-1">Sign in</Link>
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
