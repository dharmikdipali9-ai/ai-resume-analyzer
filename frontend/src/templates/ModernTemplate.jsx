function ModernTemplate({ data }) {

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
      className="bg-white text-dark p-5 shadow rounded"
      style={{
        minHeight: "1000px",
      }}
    >

      {/* Header */}

      <div className="border-bottom mb-4 pb-3">

        <h1 className="fw-bold">
          {data.full_name}
        </h1>

        <p className="text-muted">
          {data.email} | {data.phone}
        </p>

      </div>

      {/* Summary */}

      <div className="mb-4">

        <h4 className="text-primary fw-bold">
          Professional Summary
        </h4>

        <p>
          {data.ai_summary || data.summary}
        </p>

      </div>

      {/* Skills */}

      <div className="mb-4">

        <h4 className="text-primary fw-bold">
          Skills
        </h4>

        <div className="mt-3">

          {
            skillsArray.length > 0 ? (

              <p className="mb-0">
                {skillsArray.map(skill => skill.trim()).join(', ')}
              </p>

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

        <h4 className="text-primary fw-bold">
          Experience
        </h4>

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
                    whiteSpace: "pre-line",
                    lineHeight: "1.7",
                  }}
                >
                  {exp.description}
                </p>

              </div>

            ))

          ) : (

            <p style={{ whiteSpace: "pre-line" }}>
              {data.ai_experience || data.experience}
            </p>

          )
        }

      </div>

      {/* Projects */}

      <div className="mb-4">

        <h4 className="text-primary fw-bold">
          Projects
        </h4>

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
                        className="text-decoration-none"
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
                    whiteSpace: "pre-line",
                    lineHeight: "1.7",
                  }}
                >
                  {project.description}
                </p>

              </div>

            ))

          ) : (

            <p style={{ whiteSpace: "pre-line" }}>
              {data.projects}
            </p>

          )
        }

      </div>

      {/* Education */}

      <div>

        <h4 className="text-primary fw-bold">
          Education
        </h4>

        <p>
          {data.education}
        </p>

      </div>

    </div>
  )
}

export default ModernTemplate
