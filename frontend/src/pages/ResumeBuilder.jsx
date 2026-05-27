import { useState } from 'react'
import { Sparkles, Wand2, Layout } from 'lucide-react'
import API from '../api/axios'
import Navbar from '../components/Navbar'
import ResumeForm from '../components/ResumeForm'
import ResumePreview from '../components/ResumePreview'

function ResumeBuilder() {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        summary: '',
        skills: '',
        experience: '',
        projects: '',
        education: ''
    })

    const [resumeData, setResumeData] = useState(null)
    const [selectedTemplate, setSelectedTemplate] = useState('modern')
    const [loading, setLoading] = useState(false)
    const [useAI, setUseAI] = useState(true)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await API.post(
                '/resume-builder/create-resume/',
                {
                    ...formData,
                    use_ai: useAI
                }
            )
            setResumeData(res.data)
        } catch (error) {
            console.log(error)
            alert('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="app-page d-flex flex-column" style={{ minHeight: '100vh' }}>
            <Navbar />

            <div className="workspace-wrap py-5 my-auto">
                
                {/* Visual Header Workspace Deck */}
                <div className="hero-panel p-4 p-lg-5 mb-5 text-center">
                    <div className="position-relative" style={{ zIndex: 1 }}>
                    <span className="badge rounded-pill px-3 py-2 mb-3 fw-semibold small" style={{ background: 'rgba(255,255,255,.16)', color: '#fff', border: '1px solid rgba(255,255,255,.22)' }}>
                        <Sparkles size={13} className="me-1 align-middle" /> Smart Engine v3.2
                    </span>
                    
                    <h1 className="fw-bold display-5 tracking-tight mb-2">
                        AI Resume <span className="app-gradient-text">Builder</span>
                    </h1>
                    
                    <p className="small mx-auto mb-0" style={{ maxWidth: '540px', color: 'rgba(255,255,255,.76)' }}>
                        Generate polished, structured resumes with AI-enhanced content and professional templates.
                    </p>
                    </div>
                </div>

                {/* Main Split Interface Area */}
                <div className="row g-4 align-items-start">

                    {/* LEFT PANEL: Form Inputs Card Deck */}
                    <div className="col-lg-5">
                        <div className="workspace-panel builder-form-panel overflow-hidden">
                            <div className="p-3 border-bottom d-flex align-items-center gap-2">
                                <div className="p-1.5 bg-primary-subtle text-primary rounded-3">
                                    <Wand2 size={16} />
                                </div>
                                <h6 className="fw-bold text-dark mb-0 small">Content Customization</h6>
                            </div>
                            <div className="p-3">
                                <ResumeForm
                                    formData={formData}
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                    loading={loading}
                                    useAI={useAI}
                                    setUseAI={setUseAI}
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: Live Matrix Layout Previewer Canvas */}
                    <div className="col-lg-7">
                        <div className="workspace-panel builder-preview-panel builder-preview-shell overflow-hidden">
                            <div className="p-3 border-bottom d-flex align-items-center gap-2">
                                <div className="p-1.5 bg-dark-subtle text-dark rounded-3">
                                    <Layout size={16} />
                                </div>
                                <h6 className="fw-bold text-dark mb-0 small">Live Layout Engine</h6>
                            </div>
                            <div className="p-3">
                                <ResumePreview
                                    resumeData={resumeData}
                                    selectedTemplate={selectedTemplate}
                                    setSelectedTemplate={setSelectedTemplate}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ResumeBuilder
