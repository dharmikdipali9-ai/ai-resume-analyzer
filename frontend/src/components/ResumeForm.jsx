import { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'

function ResumeForm({
    formData,
    handleChange,
    handleSubmit,
    loading,
    useAI,
    setUseAI
}) {

    const [skills, setSkills] = useState(
        formData.skills ? formData.skills.split(',') : []
    )

    const [skillInput, setSkillInput] = useState('')

    const [experiences, setExperiences] = useState([
        {
            company: '',
            role: '',
            duration: '',
            description: ''
        }
    ])

    const [projects, setProjects] = useState([
        {
            title: '',
            technologies: '',
            description: '',
            github: ''
        }
    ])

    // =========================
    // Skills
    // =========================

    const addSkill = (e) => {

        if (e.key === 'Enter' && skillInput.trim() !== '') {

            e.preventDefault()

            const updatedSkills = [...skills, skillInput.trim()]

            setSkills(updatedSkills)

            handleChange({
                target: {
                    name: 'skills',
                    value: updatedSkills.join(', ')
                }
            })

            setSkillInput('')
        }
    }

    const removeSkill = (index) => {

        const updatedSkills = skills.filter((_, i) => i !== index)

        setSkills(updatedSkills)

        handleChange({
            target: {
                name: 'skills',
                value: updatedSkills.join(', ')
            }
        })
    }

    // =========================
    // Experience
    // =========================

    const addExperience = () => {

        setExperiences([
            ...experiences,
            {
                company: '',
                role: '',
                duration: '',
                description: ''
            }
        ])
    }

    const handleExperienceChange = (index, field, value) => {

        const updated = [...experiences]

        updated[index][field] = value

        setExperiences(updated)

        handleChange({
            target: {
                name: 'experience',
                value: JSON.stringify(updated)
            }
        })
    }

    // =========================
    // Projects
    // =========================

    const addProject = () => {

        setProjects([
            ...projects,
            {
                title: '',
                technologies: '',
                description: '',
                github: ''
            }
        ])
    }

    const handleProjectChange = (index, field, value) => {

        const updated = [...projects]

        updated[index][field] = value

        setProjects(updated)

        handleChange({
            target: {
                name: 'projects',
                value: JSON.stringify(updated)
            }
        })
    }

    return (

        <div className="resume-form">

            <div>

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h5 className="fw-bold mb-0 text-dark">
                        AI Resume Builder
                    </h5>

                    <span className="section-kicker">
                        Smart Resume
                    </span>

                </div>

                {/* Progress */}

                <div className="soft-stat mb-4">

                    <div className="d-flex justify-content-between mb-2 text-dark">
                        <span className="small fw-bold text-secondary">Profile Completion</span>
                        <span className="small fw-bold text-primary">80%</span>
                    </div>

                    <div className="progress" style={{ height: '10px' }}>

                        <div
                            className="progress-bar"
                            style={{ width: '80%' }}
                        ></div>

                    </div>

                </div>

                <form onSubmit={handleSubmit}>

                    {/* Personal Information */}

                    <div className="resume-form-section">

                        <h5 className="fw-bold mb-4 text-primary">
                            <i className="bi bi-person-fill me-2"></i>
                            Personal Information
                        </h5>

                        <div className="row g-3">

                            <div className="col-md-6">

                                <input
                                    type="text"
                                    name="full_name"
                                    placeholder="Full Name"
                                    className="form-control rounded-3 py-2"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-6">

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    className="form-control rounded-3 py-2"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-6">

                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone Number"
                                    className="form-control rounded-3 py-2"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                    </div>

                    {/* Summary */}

                    <div className="resume-form-section">

                        <div className="d-flex justify-content-between align-items-center mb-3">

                            <h5 className="fw-bold text-primary mb-0">
                                <i className="bi bi-file-earmark-text-fill me-2"></i>
                                Professional Summary
                            </h5>

                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                            >
                                Improve with AI
                            </button>

                        </div>

                        <textarea
                            name="summary"
                            placeholder="Write a professional summary..."
                            className="form-control rounded-3"
                            rows="5"
                            value={formData.summary}
                            onChange={handleChange}
                        />

                    </div>

                    {/* Skills */}

                    <div className="resume-form-section">

                        <h5 className="fw-bold mb-3 text-primary">
                            <i className="bi bi-lightning-fill me-2"></i>
                            Skills
                        </h5>

                        <div className="d-flex gap-2">

                            <input
                                type="text"
                                className="form-control rounded-3 py-2"
                                placeholder="Type a skill"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        addSkill(e)
                                    }
                                }}
                            />

                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {

                                    if (skillInput.trim() === '') return

                                    const updatedSkills = [
                                        ...skills,
                                        skillInput.trim()
                                    ]

                                    setSkills(updatedSkills)

                                    handleChange({
                                        target: {
                                            name: 'skills',
                                            value: updatedSkills.join(', ')
                                        }
                                    })

                                    setSkillInput('')
                                }}
                            >
                                Add
                            </button>

                        </div>

                        <div className="d-flex flex-wrap gap-2 mt-3">

                            {skills.map((skill, index) => (

                                <span
                                    key={index}
                                className="app-chip text-primary"
                                >
                                    {skill}

                                    <i
                                        className="bi bi-x ms-2"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => removeSkill(index)}
                                    ></i>

                                </span>

                            ))}

                        </div>

                    </div>

                    {/* Experience */}

                    <div className="resume-form-section">

                        <div className="d-flex justify-content-between align-items-center mb-3">

                            <h5 className="fw-bold text-primary mb-0">
                                <i className="bi bi-briefcase-fill me-2"></i>
                                Experience
                            </h5>

                            <button
                                type="button"
                                className="btn btn-outline-primary btn-sm"
                                onClick={addExperience}
                            >
                                + Add Experience
                            </button>

                        </div>

                        {experiences.map((exp, index) => (

                            <div
                                key={index}
                                className="soft-card p-3 mb-3"
                            >

                                <div className="row g-3">

                                    <div className="col-md-6">

                                        <input
                                            type="text"
                                            placeholder="Company Name"
                                            className="form-control rounded-3"
                                            value={exp.company}
                                            onChange={(e) =>
                                                handleExperienceChange(index, 'company', e.target.value)
                                            }
                                        />

                                    </div>

                                    <div className="col-md-6">

                                        <input
                                            type="text"
                                            placeholder="Job Role"
                                            className="form-control rounded-3"
                                            value={exp.role}
                                            onChange={(e) =>
                                                handleExperienceChange(index, 'role', e.target.value)
                                            }
                                        />

                                    </div>

                                    <div className="col-md-12">

                                        <input
                                            type="text"
                                            placeholder="Duration"
                                            className="form-control rounded-3"
                                            value={exp.duration}
                                            onChange={(e) =>
                                                handleExperienceChange(index, 'duration', e.target.value)
                                            }
                                        />

                                    </div>

                                    <div className="col-md-12">

                                        <textarea
                                            placeholder="Describe your work and achievements"
                                            className="form-control rounded-3"
                                            rows="4"
                                            value={exp.description}
                                            onChange={(e) =>
                                                handleExperienceChange(index, 'description', e.target.value)
                                            }
                                        />

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                    {/* Projects */}

                    <div className="resume-form-section">

                        <div className="d-flex justify-content-between align-items-center mb-3">

                            <h5 className="fw-bold text-primary mb-0">
                                <i className="bi bi-code-slash me-2"></i>
                                Projects
                            </h5>

                            <button
                                type="button"
                                className="btn btn-outline-primary btn-sm"
                                onClick={addProject}
                            >
                                + Add Project
                            </button>

                        </div>

                        {projects.map((project, index) => (

                            <div
                                key={index}
                                className="soft-card p-3 mb-3"
                            >

                                <div className="row g-3">

                                    <div className="col-md-6">

                                        <input
                                            type="text"
                                            placeholder="Project Title"
                                            className="form-control rounded-3"
                                            value={project.title}
                                            onChange={(e) =>
                                                handleProjectChange(index, 'title', e.target.value)
                                            }
                                        />

                                    </div>

                                    <div className="col-md-6">

                                        <input
                                            type="text"
                                            placeholder="Technologies Used"
                                            className="form-control rounded-3"
                                            value={project.technologies}
                                            onChange={(e) =>
                                                handleProjectChange(index, 'technologies', e.target.value)
                                            }
                                        />

                                    </div>

                                    <div className="col-md-12">

                                        <textarea
                                            placeholder="Project Description"
                                            className="form-control rounded-3"
                                            rows="4"
                                            value={project.description}
                                            onChange={(e) =>
                                                handleProjectChange(index, 'description', e.target.value)
                                            }
                                        />

                                    </div>

                                    <div className="col-md-12">

                                        <input
                                            type="text"
                                            placeholder="GitHub Link"
                                            className="form-control rounded-3"
                                            value={project.github}
                                            onChange={(e) =>
                                                handleProjectChange(index, 'github', e.target.value)
                                            }
                                        />

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                    {/* Education */}

                    <div className="resume-form-section">

                        <h5 className="fw-bold mb-3 text-primary">
                            <i className="bi bi-mortarboard-fill me-2"></i>
                            Education
                        </h5>

                        <textarea
                            name="education"
                            placeholder="Education Details"
                            className="form-control rounded-3"
                            rows="4"
                            value={formData.education}
                            onChange={handleChange}
                        />

                    </div>

                    {/* AI Toggle */}

                    <div className="ai-toggle-row my-4">

                        <input
                            className="ai-toggle-input"
                            type="checkbox"
                            id="aiToggle"
                            checked={useAI}
                            onChange={(e) => setUseAI(e.target.checked)}
                        />

                        <label
                            className="ai-toggle-button"
                            htmlFor="aiToggle"
                        >
                            <span className="ai-toggle-track">
                                <span className="ai-toggle-thumb"></span>
                            </span>
                            <span className="fw-semibold">AI Improve My Resume</span>
                        </label>

                    </div>

                    {/* Submit Button */}

                    <button
                        className="btn btn-primary w-100 py-3 fw-bold rounded-3"
                        type="submit"
                        disabled={loading}
                    >

                        {
                            loading
                                ? 'Generating Resume...'
                                : 'Generate Resume'
                        }

                    </button>

                </form>

            </div>

        </div>

    )
}

export default ResumeForm
