import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import API from '../api/axios'
import { useNavigate } from 'react-router-dom'
import { FileText, FolderOpen, Plus } from 'lucide-react'

function MyResumes() {
    const [resumes, setResumes] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        fetchResumes()
    }, [])

    const fetchResumes = async () => {
        try {
            const response = await API.get('/resumes/my-resumes/')
            setResumes(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const viewAnalysis = (resumeId) => {
        localStorage.setItem('resume_id', resumeId)
        navigate('/resume-analysis')
    }

    // Helper to determine score color
    const getScoreColor = (score) => {
        if (!score) return '#6c757d';
        if (score >= 80) return '#28a745';
        if (score >= 50) return '#ffc107';
        return '#dc3545';
    }

    return (
        <div className="app-page" style={{ minHeight: '100vh' }}>
            <Navbar />

            <div className="workspace-wrap py-5">
                {/* Header Section */}
                <div className="hero-panel p-4 p-lg-5 mb-5 d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <div>
                        <span className="badge rounded-pill px-3 py-2 mb-3 fw-semibold" style={{ background: 'rgba(255,255,255,.16)', color: '#fff', border: '1px solid rgba(255,255,255,.22)' }}>
                            Report Library
                        </span>
                        <h2 className="fw-bold mb-1 position-relative" style={{ zIndex: 1 }}>Resume History</h2>
                        <p className="mb-0 position-relative" style={{ color: 'rgba(255,255,255,.76)', zIndex: 1 }}>Track your performance and improvements over time.</p>
                    </div>
                    <button onClick={() => navigate('/upload-resume')} className="btn btn-light px-4 fw-bold shadow-sm d-flex align-items-center gap-2 position-relative" style={{ zIndex: 1 }}>
                        <Plus size={16} />
                        Upload New
                    </button>
                </div>

                {loading ? (
                    <div className="d-flex flex-column align-items-center mt-5">
                        <div className="spinner-border text-primary mb-3" role="status"></div>
                        <p className="text-muted fw-medium">Retrieving your documents...</p>
                    </div>
                ) : resumes.length === 0 ? (
                    <div className="workspace-panel text-center py-5 px-4">
                        <div className="icon-tile mb-2">
                            <FolderOpen size={28} />
                        </div>
                        <h4 className="mt-3 fw-bold">No resumes yet</h4>
                        <p className="text-muted">Upload your first resume to see the AI analysis here.</p>
                    </div>
                ) : (
                    <div className="row g-4">
                        {resumes.map((resume) => (
                            <div key={resume.id} className="col-lg-4 col-md-6">
                                <div className="soft-card h-100 hover-card">
                                    <div className="card-body p-4 d-flex flex-column">
                                        {/* File Icon & Name */}
                                        <div className="d-flex align-items-start mb-3">
                                            <div className="file-icon-box me-3">
                                                <FileText size={22} />
                                            </div>
                                            <div className="overflow-hidden">
                                                <h6 className="fw-bold text-truncate mb-0" title={resume.file_name}>
                                                    {resume.file_name}
                                                </h6>
                                                <small className="text-muted">
                                                    {new Date(resume.uploaded_at).toLocaleDateString('en-US', { 
                                                        month: 'short', day: 'numeric', year: 'numeric' 
                                                    })}
                                                </small>
                                            </div>
                                        </div>

                                        <hr className="my-3 opacity-25" />

                                        {/* Score Section */}
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <span className="text-muted small fw-bold text-uppercase">ATS Score</span>
                                            <div 
                                                className="score-badge"
                                                style={{ 
                                                    backgroundColor: `${getScoreColor(resume.ats_score)}15`, 
                                                    color: getScoreColor(resume.ats_score),
                                                    border: `1px solid ${getScoreColor(resume.ats_score)}30`
                                                }}
                                            >
                                                {resume.ats_score ? `${resume.ats_score}%` : 'Pending'}
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <button
                                            className="btn btn-light w-100 mt-auto fw-bold border-0 py-2 view-btn"
                                            onClick={() => viewAnalysis(resume.id)}
                                        >
                                            View Detailed Report
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style>{`
                .hover-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 1rem 3rem rgba(17,24,39,.14) !important;
                }
                .file-icon-box {
                    background: #eef4ff;
                    color: #2357d9;
                    width: 45px;
                    height: 45px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px;
                    font-size: 1.2rem;
                }
                .score-badge {
                    padding: 4px 12px;
                    border-radius: 50px;
                    font-weight: 800;
                    font-size: 0.85rem;
                }
                .view-btn {
                    background-color: #f8f9fa;
                    color: #212529;
                    transition: all 0.2s;
                }
                .view-btn:hover {
                    background-color: #212529 !important;
                    color: white !important;
                }
            `}</style>
        </div>
    )
}

export default MyResumes
