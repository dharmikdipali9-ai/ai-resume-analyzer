import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import API from '../api/axios'
import { useNavigate } from 'react-router-dom'
import {
    Download,
    User,
    Mail,
    Phone,
    Cpu,
    Target,
    CheckCircle2,
    AlertTriangle,
    Lightbulb,
    MessageSquare,
    Bot,
    Sparkles,
    BarChart3,
    HelpCircle,
    FileText // Imported for the Resume Builder section
} from 'lucide-react'

function ResumeAnalysis() {
    const [resumeData, setResumeData] = useState(null)
    const [atsData, setATSData] = useState(null)
    const [feedback, setFeedback] = useState('')
    const [questions, setQuestions] = useState([])
    const [targetRole, setTargetRole] = useState('Full Stack Developer')
    const [loading, setLoading] = useState(true)
    const [atsLoading, setATSLoading] = useState(false)
    const [aiLoading, setAILoading] = useState(false)
    const resumeId = localStorage.getItem('resume_id')

    useEffect(() => {
        parseResume()
    }, [])

    const parseResume = async () => {
        try {
            const response = await API.post(`/resumes/parse/${resumeId}/`)
            setResumeData(response.data.data)
        } catch (error) {
            alert('Resume parsing failed')
        } finally {
            setLoading(false)
        }
    }

    const downloadReport = async () => {

        try {

            const response = await API.get(
                `/resumes/report/${resumeId}/`,
                {
                    responseType: 'blob'
                }
            )

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            )

            const link = document.createElement('a')

            link.href = url

            link.setAttribute(
                'download',
                'resume_report.pdf'
            )

            document.body.appendChild(link)

            link.click()

            link.remove()

        } catch (error) {

            console.log(error)

            alert('PDF download failed')

        }

    }

    const generateATS = async () => {
        try {
            setATSLoading(true)
            const response = await API.post(`/resumes/ats-score/${resumeId}/`, { target_role: targetRole })
            setATSData(response.data.result)
        } catch (error) {
            alert('ATS generation failed')
        } finally {
            setATSLoading(false)
        }
    }

    const generateAIFeedback = async () => {
        try {
            setAILoading(true)
            const response = await API.post(`/ai/resume-feedback/${resumeId}/`)
            setFeedback(response.data.feedback)
        } catch (error) {
            alert('AI feedback failed')
        } finally {
            setAILoading(false)
        }
    }

    const generateQuestions = async () => {
        try {
            setAILoading(true)
            const response = await API.post(`/ai/interview-questions/${resumeId}/`, { target_role: targetRole })

            let rawQuestions = Array.isArray(response.data.questions)
                ? response.data.questions
                : response.data.questions.split('\n');

            const cleanQuestions = rawQuestions
                .map(q => q.replace(/^\d+\.\s*/, '').replace(/\*\*/g, '').trim())
                .filter(q => q.length > 10 && !q.toLowerCase().includes("here are") && !q.toLowerCase().includes("questions:"));

            setQuestions(cleanQuestions)
        } catch (error) {
            alert('Question generation failed')
        } finally {
            setAILoading(false)
        }
    }

    const navigate = useNavigate()
    const handleBuildResume = () => {

        navigate('/resume-builder')

    }

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 flex-column" style={{ backgroundColor: '#f8fafc' }}>
                <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status"></div>
                <h5 className="fw-semibold text-secondary">Analyzing your profile...</h5>
            </div>
        )
    }

    return (
        <div className="app-page" style={{ minHeight: '100vh' }}>
            <Navbar />

            <div className="workspace-wrap py-5">
                {/* Header Section */}
                <div className="hero-panel p-4 p-lg-5 mb-5 d-md-flex justify-content-between align-items-center gap-3">
                    <div>
                        <span className="badge rounded-pill px-3 py-2 mb-3 fw-semibold" style={{ background: 'rgba(255,255,255,.16)', color: '#fff', border: '1px solid rgba(255,255,255,.22)' }}>
                            Resume Intelligence
                        </span>
                        <h2 className="fw-bold mb-1 position-relative" style={{ zIndex: 1 }}>Analysis Workspace</h2>
                        <p className="mb-0 position-relative" style={{ color: 'rgba(255,255,255,.76)', zIndex: 1 }}>Optimize your professional profile for <strong>{targetRole}</strong></p>
                    </div>
                    <button className="btn btn-light border shadow-sm rounded-pill px-4 py-2 d-flex align-items-center gap-2 mt-3 mt-md-0 position-relative" style={{ zIndex: 1 }} onClick={downloadReport}>
                        <Download size={18} className="text-success" />
                        <span className="fw-semibold">Download PDF Report</span>
                    </button>
                </div>

                {/* TOP SECTION: Split Profile & Controls */}
                <div className="row g-4 mb-5">
                    {/* Left Hand: Contact & Skills */}
                    <div className="col-lg-5 col-xl-4 d-flex flex-column gap-4">
                        <div className="workspace-panel p-4 h-100">
                            <h5 className="fw-bold mb-4 d-flex align-items-center gap-2 text-dark">
                                <User size={20} className="text-primary" /> Profile Info
                            </h5>
                            <div className="mb-3">
                                <small className="text-muted d-block fw-bold text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>Full Name</small>
                                <span className="text-dark fw-semibold fs-5">{resumeData?.name || 'Not found'}</span>
                            </div>
                            <div className="mb-3">
                                <small className="text-muted d-block fw-bold text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>Email Address</small>
                                <div className="d-flex align-items-center gap-2 mt-1">
                                    <Mail size={14} className="text-muted" />
                                    <span className="text-dark fw-medium">{resumeData?.email || 'Not found'}</span>
                                </div>
                            </div>
                            <div className="mb-0">
                                <small className="text-muted d-block fw-bold text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>Phone Number</small>
                                <div className="d-flex align-items-center gap-2 mt-1">
                                    <Phone size={14} className="text-muted" />
                                    <span className="text-dark fw-medium">{resumeData?.phone || 'Not found'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="workspace-panel p-4">
                            <h5 className="fw-bold mb-3 d-flex align-items-center gap-2 text-dark">
                                <Cpu size={20} className="text-primary" /> Core Skills
                            </h5>
                            <div className="d-flex flex-wrap gap-2">
                                {resumeData?.skills?.map((skill, index) => (
                                    <span key={index} className="badge bg-light text-secondary border px-3 py-2 rounded-pill fw-medium" style={{ fontSize: '0.8rem' }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Hand: Action & Strategy Hub */}
                    <div className="col-lg-7 col-xl-8">
                        <div className="workspace-panel p-4 h-100 d-flex flex-column justify-content-between">
                            <div>
                                <h5 className="fw-bold mb-2 d-flex align-items-center gap-2">
                                    <Sparkles size={20} className="text-warning-emphasis" /> AI Analysis Hub
                                </h5>
                                <p className="text-muted small mb-4">Select or modify your target occupation to regenerate strategic suggestions, compatibility indexing, and technical alignment.</p>

                                <div className="mb-4">
                                    <label className="small fw-bold text-secondary mb-2 text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>Target Job Title</label>
                                    <div className="input-group shadow-sm rounded-3 overflow-hidden">
                                        <span className="input-group-text bg-light border-0"><Target size={18} className="text-muted" /></span>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg border-0 bg-light"
                                            value={targetRole}
                                            onChange={(e) => setTargetRole(e.target.value)}
                                            style={{ fontSize: '1rem' }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* AI Resume Builder Feature Div */}
                            <div className="analysis-feature-card p-3 mb-3 rounded-4 border-start border-primary border-4" style={{ backgroundColor: '#f0f5ff' }}>
                                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                                    <div className="d-flex align-items-start gap-3">
                                        <div className="p-2 bg-white rounded-3 shadow-sm mt-1">
                                            <FileText size={20} className="text-primary" />
                                        </div>
                                        <div>
                                            <h6 className="fw-bold text-dark mb-1">AI Resume Builder</h6>
                                            <p className="text-muted small mb-0">Generate a tailored, high-scoring resume variant targeting a {targetRole} description seamlessly.</p>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary btn-sm px-4 py-2 rounded-pill fw-bold shadow-sm" onClick={handleBuildResume}>
                                        Build Smart Resume
                                    </button>
                                </div>
                            </div>

                            <div className="soft-stat">
                                <label className="small fw-bold text-muted mb-2 text-uppercase d-block" style={{ fontSize: '0.65rem' }}>Available Operations</label>
                                <div className="row g-2">
                                    <div className="col-sm-4">
                                        <button className="btn btn-dark w-100 py-2.5 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2" onClick={generateATS} disabled={atsLoading}>
                                            <BarChart3 size={16} />
                                            {atsLoading ? 'Scoring...' : 'Score ATS'}
                                        </button>
                                    </div>
                                    <div className="col-sm-4">
                                        <button className="btn btn-primary w-100 py-2.5 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2" onClick={generateAIFeedback} disabled={aiLoading}>
                                            <Bot size={16} />
                                            {aiLoading ? 'Reviewing...' : 'AI Feedback'}
                                        </button>
                                    </div>
                                    <div className="col-sm-4">
                                        <button className="btn btn-outline-primary bg-white w-100 py-2.5 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2" onClick={generateQuestions} disabled={aiLoading}>
                                            <HelpCircle size={16} />
                                            {aiLoading ? 'Creating...' : 'Questions'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION: Full Width Response Engine */}
                <div className="row g-4">
                    {/* ATS Matrix Card */}
                    {atsData && (
                        <div className="col-12">
                            <div className="workspace-panel overflow-hidden">
                                <div className="bg-dark p-4 d-flex justify-content-between align-items-center">
                                    <h5 className="text-white fw-bold m-0 d-flex align-items-center gap-2">
                                        <BarChart3 size={20} className="text-primary" /> ATS Score Analysis
                                    </h5>
                                    <div className="badge bg-secondary px-3 py-2 text-uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>Role: {targetRole}</div>
                                </div>
                                <div className="card-body p-4">
                                    <div className="row align-items-center mb-4 g-4">
                                        <div className="col-md-3 text-center border-md-end">
                                            <div className="display-3 fw-bold mb-0 text-primary">{atsData.ats_score}%</div>
                                            <small className="text-uppercase fw-bold text-muted" style={{ letterSpacing: '1px', fontSize: '0.75rem' }}>Match Score</small>
                                        </div>
                                        <div className="col-md-9 ps-md-4">
                                            <h6 className="fw-bold mb-2">Overall Compatibility</h6>
                                            <div className="progress mb-2" style={{ height: '14px', borderRadius: '20px', backgroundColor: '#e9ecef' }}>
                                                <div
                                                    className={`progress-bar progress-bar-striped progress-bar-animated ${atsData.ats_score > 75 ? 'bg-success' : 'bg-warning'}`}
                                                    style={{ width: `${atsData.ats_score}%` }}
                                                ></div>
                                            </div>
                                            <small className="text-muted fst-italic">
                                                {atsData.ats_score > 75 ? "Excellent! Your resume matches most industry criteria for this standard position." : "Structural Alert: Critical key segments are omitted. See missing requirements below."}
                                            </small>
                                        </div>
                                    </div>

                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="analysis-result-card is-danger p-4 rounded-4 h-100" style={{ backgroundColor: '#fff5f5', border: '1px solid #fed7d7' }}>
                                                <h6 className="text-danger fw-bold mb-3 d-flex align-items-center">
                                                    <AlertTriangle size={18} className="me-2" /> Missing Keywords
                                                </h6>
                                                <div className="d-flex flex-wrap gap-2">
                                                    {atsData.missing_skills?.length > 0 ? (
                                                        atsData.missing_skills.map((s, i) => (
                                                            <span key={i} className="badge bg-white text-danger border border-danger-subtle px-3 py-2 rounded-pill fw-semibold">
                                                                + {s}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-muted small">No significant missing keywords detected.</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="analysis-result-card is-success p-4 rounded-4 h-100" style={{ backgroundColor: '#f0fff4', border: '1px solid #c6f6d5' }}>
                                                <h6 className="text-success fw-bold mb-3 d-flex align-items-center">
                                                    <Lightbulb size={18} className="me-2" /> Optimization Tips
                                                </h6>
                                                <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                                                    {atsData.suggestions?.map((s, i) => (
                                                        <li key={i} className="small text-dark d-flex align-items-start gap-2">
                                                            <CheckCircle2 size={15} className="text-success mt-0.5 flex-shrink-0" />
                                                            <span>{s}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* AI Feedback Card */}
                    {feedback && (
                        <div className="col-12">
                            <div className="workspace-panel" style={{ borderLeft: '6px solid #2557d6' }}>
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-center mb-4">
                                        <div className="bg-primary-subtle p-2.5 rounded-circle me-3">
                                            <Bot size={22} className="text-primary" />
                                        </div>
                                        <div>
                                            <h5 className="fw-bold mb-0 text-dark">AI Strategic Review</h5>
                                            <small className="text-muted">Targeted critique calibrated around your background parameters</small>
                                        </div>
                                    </div>
                                    <div className="analysis-feedback-box p-4 rounded-4 bg-white border shadow-inner" style={{ whiteSpace: 'pre-line', lineHeight: '1.8', color: '#334155', fontSize: '0.98rem' }}>
                                        {feedback}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Interview Questions Card */}
                    {questions.length > 0 && (
                        <div className="col-12">
                            <div className="workspace-panel">
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-center mb-4">
                                        <div className="bg-success-subtle p-2.5 rounded-circle me-3">
                                            <MessageSquare size={22} className="text-success" />
                                        </div>
                                        <div>
                                            <h5 className="fw-bold mb-0 text-dark">Predictive Interview Simulation</h5>
                                            <p className="text-muted small mb-0">High-probability questions selected specifically for your technical scope</p>
                                        </div>
                                    </div>

                                    <div className="row g-3">
                                        {questions.map((q, i) => (
                                            <div className="col-md-6" key={i}>
                                                <div
                                                    className="p-3 h-100 rounded-4 bg-light d-flex align-items-start gap-3 border-start border-primary border-4 shadow-sm"
                                                >
                                                    <div className="badge rounded-pill bg-primary-subtle text-primary px-2.5 py-1.5 small flex-shrink-0">
                                                        Q {i + 1}
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <p className="mb-0 fw-semibold text-dark" style={{ lineHeight: '1.5', fontSize: '0.92rem' }}>
                                                            {q}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ResumeAnalysis
