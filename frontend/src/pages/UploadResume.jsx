import { useState } from 'react'
import API from '../api/axios'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, FileText } from 'lucide-react'

function UploadResume() {
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [dragging, setDragging] = useState(false)
    const navigate = useNavigate()

    const handleFileChange = (selectedFile) => {
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile)
        } else {
            alert('Please upload a valid PDF file.')
        }
    }

    const handleUpload = async (e) => {
        e.preventDefault()
        if (!file) return alert('Please select a PDF file')

        const formData = new FormData()
        formData.append('resume', file)

        try {
            setLoading(true)
            const token = localStorage.getItem('access')
            const response = await API.post('/resumes/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.setItem('resume_id', response.data.resume_id)
            navigate('/resume-analysis')
        } catch (error) {
            alert('Upload failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="app-page" style={{ minHeight: '100vh' }}>
            <Navbar />

            <div className="workspace-wrap py-5 mt-4">
                <section className="hero-panel p-4 p-lg-5 mb-4">
                    <div className="position-relative" style={{ zIndex: 1 }}>
                        <span className="badge rounded-pill px-3 py-2 mb-3 fw-semibold" style={{ background: 'rgba(255,255,255,.16)', color: '#fff', border: '1px solid rgba(255,255,255,.22)' }}>
                            Resume Intelligence
                        </span>
                        <h1 className="display-6 fw-bold mb-2">Analyze Your Resume</h1>
                        <p className="mb-0" style={{ color: 'rgba(255,255,255,.76)', maxWidth: '620px' }}>
                            Upload a PDF and turn it into ATS scoring, extracted skills, AI feedback, and interview-ready insights.
                        </p>
                    </div>
                </section>
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8">
                        <div className="text-center mb-4 d-none">
                            <h2 className="fw-bold text-dark">Analyze Your Resume</h2>
                            <p className="text-muted">Our AI will score your skills and provide optimization tips.</p>
                        </div>

                        <div className="workspace-panel p-4">
                            <form onSubmit={handleUpload}>
                                {/* Drag & Drop Area */}
                                <div 
                                    className={`upload-zone mb-4 ${dragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
                                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                                    onDragLeave={() => setDragging(false)}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        setDragging(false);
                                        handleFileChange(e.dataTransfer.files[0]);
                                    }}
                                    onClick={() => document.getElementById('fileInput').click()}
                                >
                                    <input 
                                        type="file" 
                                        id="fileInput" 
                                        hidden 
                                        accept=".pdf" 
                                        onChange={(e) => handleFileChange(e.target.files[0])} 
                                    />
                                    
                                    <div className="py-5 text-center">
                                        <div className="upload-icon mb-3">
                                            <span className="icon-tile">
                                                {file ? <CheckCircle2 size={28} /> : <FileText size={28} />}
                                            </span>
                                        </div>
                                        {file ? (
                                            <div>
                                                <h6 className="fw-bold text-dark mb-1">{file.name}</h6>
                                                <small className="text-success">Click or drag to replace</small>
                                            </div>
                                        ) : (
                                            <div>
                                                <h6 className="fw-bold text-dark mb-1">Click to upload or drag and drop</h6>
                                                <small className="text-muted">Maximum file size: 5MB (PDF only)</small>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button 
                                    className="btn btn-primary w-100 py-3 fw-bold shadow-sm"
                                    disabled={loading || !file}
                                >
                                    {loading ? (
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                    ) : null}
                                    {loading ? 'Processing Resume...' : 'Analyze My Resume'}
                                </button>
                            </form>
                        </div>

                        {/* Tips Section */}
                        <div className="mt-5 text-center px-4">
                            <div className="row g-3">
                                <div className="col-4">
                                    <div className="small text-muted fw-bold uppercase ls-1">Privacy</div>
                                    <small className="text-secondary">Secure & Encrypted</small>
                                </div>
                                <div className="col-4 border-start border-end">
                                    <div className="small text-muted fw-bold uppercase ls-1">Speed</div>
                                    <small className="text-secondary">~10s Analysis</small>
                                </div>
                                <div className="col-4">
                                    <div className="small text-muted fw-bold uppercase ls-1">Format</div>
                                    <small className="text-secondary">PDF Recommended</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .upload-zone {
                    border: 2px dashed rgba(190, 202, 220, 0.9);
                    border-radius: 16px;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    background: rgba(255,255,255,0.78);
                }
                .upload-zone:hover, .upload-zone.dragging {
                    border-color: #2557d6;
                    background: #eef4ff;
                }
                .upload-zone.has-file {
                    border-color: #0f9f7a;
                    background: #effbf5;
                }
                .upload-icon {
                    font-size: 3rem;
                    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.05));
                }
                .ls-1 { letter-spacing: 1px; font-size: 0.7rem !important; }
            `}</style>
        </div>
    )
}

export default UploadResume
