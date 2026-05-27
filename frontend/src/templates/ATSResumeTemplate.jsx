function ATSResumeTemplate({ data }) {

    console.log('ATS DATA:', data)

    let experienceData = []
    let projectData = []

    try {
        experienceData = JSON.parse(data.experience || '[]')
    } catch {
        experienceData = []
    }

    try {
        projectData = JSON.parse(data.projects || '[]')
    } catch {
        projectData = []
    }

    // =========================
    // Skills Fix
    // =========================

    const skillsText =
        data.ai_skills ||
        data.skills ||
        ''

    const skillsArray = skillsText
        .split(',')
        .filter(skill => skill.trim() !== '')

    return (

        <div
            id="resume-preview"
            className="bg-white text-dark p-5 shadow rounded-4"
            style={{
                minHeight: '1000px',
                fontFamily: 'Arial'
            }}
        >

            {/* Header */}

            <div className="text-center mb-5">

                <h1
                    className="fw-bold mb-2"
                    style={{
                        fontSize: '38px',
                        letterSpacing: '1px'
                    }}
                >
                    {data.full_name}
                </h1>

                <p className="mb-0 text-muted">
                    {data.email} | {data.phone}
                </p>

            </div>

            {/* Summary */}

            <div className="mb-4">

                <h5 className="fw-bold border-bottom pb-2">
                    PROFESSIONAL SUMMARY
                </h5>

                <p
                    className="mt-3"
                    style={{
                        lineHeight: '1.8'
                    }}
                >
                    {data.ai_summary || data.summary}
                </p>

            </div>

            {/* Skills */}

            <div className="mb-4">

                <h5 className="fw-bold border-bottom pb-2">
                    SKILLS
                </h5>

                <div className="d-flex flex-wrap gap-2 mt-3">

                    {
                        skillsArray.length > 0 ? (

                            skillsArray.map((skill, index) => (

                                <span
                                    key={index}
                                    className="badge border text-dark px-3 py-2"
                                >
                                    {skill.trim()}
                                </span>

                            ))

                        ) : (

                            <p className="text-muted">
                                No skills added
                            </p>

                        )
                    }

                </div>

            </div>

            {/* Experience */}

            <div className="mb-4">

                <h5 className="fw-bold border-bottom pb-2">
                    EXPERIENCE
                </h5>

                <div className="mt-3">

                    {
                        experienceData.length > 0 ? (

                            experienceData.map((exp, index) => (

                                <div
                                    key={index}
                                    className="mb-4"
                                >

                                    <div className="d-flex justify-content-between">

                                        <h6 className="fw-bold mb-1">
                                            {exp.role}
                                        </h6>

                                        <span className="text-muted">
                                            {exp.duration}
                                        </span>

                                    </div>

                                    <p className="fw-semibold text-secondary mb-2">
                                        {exp.company}
                                    </p>

                                    <p
                                        style={{
                                            whiteSpace: 'pre-line',
                                            lineHeight: '1.7'
                                        }}
                                    >
                                        {exp.description}
                                    </p>

                                </div>

                            ))

                        ) : (

                            <p style={{ whiteSpace: 'pre-line' }}>
                                {data.ai_experience || data.experience}
                            </p>

                        )
                    }

                </div>

            </div>

            {/* Projects */}

            <div className="mb-4">

                <h5 className="fw-bold border-bottom pb-2">
                    PROJECTS
                </h5>

                <div className="mt-3">

                    {
                        projectData.length > 0 ? (

                            projectData.map((project, index) => (

                                <div
                                    key={index}
                                    className="mb-4"
                                >

                                    <div className="d-flex justify-content-between align-items-center">

                                        <h6 className="fw-bold mb-1">
                                            {project.title}
                                        </h6>

                                        {
                                            project.github && (

                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-decoration-none text-dark"
                                                >
                                                    GitHub
                                                </a>

                                            )
                                        }

                                    </div>

                                    <p className="text-secondary fw-semibold mb-2">
                                        {project.technologies}
                                    </p>

                                    <p
                                        style={{
                                            whiteSpace: 'pre-line',
                                            lineHeight: '1.7'
                                        }}
                                    >
                                        {project.description}
                                    </p>

                                </div>

                            ))

                        ) : (

                            <p style={{ whiteSpace: 'pre-line' }}>
                                {data.projects}
                            </p>

                        )
                    }

                </div>

            </div>

            {/* Education */}

            <div>

                <h5 className="fw-bold border-bottom pb-2">
                    EDUCATION
                </h5>

                <p
                    className="mt-3"
                    style={{
                        lineHeight: '1.8'
                    }}
                >
                    {data.education}
                </p>

            </div>

        </div>

    )
}

export default ATSResumeTemplate