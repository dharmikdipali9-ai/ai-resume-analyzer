import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, ArrowRight, ShieldCheck, Sparkles, FileText, BarChart3, MessageSquareQuote } from 'lucide-react'
import API from '../api/axios'

function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
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

            const response = await API.post(
                '/users/login/',
                formData
            )

            // Save Tokens
            localStorage.setItem(
                'access',
                response.data.access
            )

            localStorage.setItem(
                'refresh',
                response.data.refresh
            )

            // Save User
            localStorage.setItem(
                'user',
                JSON.stringify(response.data.user)
            )

            navigate('/dashboard')

        } catch (error) {

            console.error(error)

            alert(
                error.response?.data?.error ||
                'Login failed'
            )

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
                            <h1 className="auth-title mt-3 mb-3">Build resumes that look sharp and score better.</h1>
                            <p className="auth-copy mb-4">
                                Analyze ATS fit, create tailored resumes, and practice interviews from one polished dashboard.
                            </p>
                            <div className="auth-preview">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div>
                                        <small>Resume score</small>
                                        <strong>86%</strong>
                                    </div>
                                    <BarChart3 size={24} />
                                </div>
                                <div className="auth-progress mb-4"><span style={{ width: '86%' }}></span></div>
                                <div className="row g-3">
                                    <div className="col-6">
                                        <div className="auth-mini-card">
                                            <FileText size={18} />
                                            <span>ATS Report</span>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="auth-mini-card">
                                            <MessageSquareQuote size={18} />
                                            <span>Interview Prep</span>
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
                                    <ShieldCheck size={24} strokeWidth={2} />
                                </div>
                                <h2 className="fw-bold text-dark mb-2">Welcome back</h2>
                                <p className="text-muted mb-0">Sign in to continue improving your resume.</p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label small fw-semibold text-secondary">Email address</label>
                                    <div className="input-group">
                                        <span className="input-group-text premium-input text-secondary border-end-0">
                                            <Mail size={16} />
                                        </span>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="alex@example.com"
                                            className="form-control premium-input border-start-0 ps-1 py-3 shadow-none"
                                            onChange={handleChange}
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="d-flex justify-content-between mb-1">
                                        <label className="form-label small fw-semibold text-secondary mb-0">Password</label>
                                        {/* <Link to="#" className="small text-primary text-decoration-none fw-medium">Forgot password?</Link> */}
                                    </div>
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
                                            Sign In <ArrowRight size={16} />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="text-center mt-3 pt-2">
                                <p className="text-muted small mb-0">
                                    Don't have an account? <Link to="/register" className="text-primary fw-bold text-decoration-none ms-1">Create an account</Link>
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
