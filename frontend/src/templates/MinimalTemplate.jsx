function MinimalTemplate({ data }) {

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
      className="bg-white text-dark p-5 shadow-sm"
      style={{
        minHeight: "1000px",
      }}
    >

      {/* Name */}

      <div className="mb-5">

        <h1
          className="fw-light"
          style={{
            fontSize: "42px",
            letterSpacing: "1px",
          }}
        >
          {data.full_name}
        </h1>

        <p className="text-muted">
          {data.email} • {data.phone}
        </p>

      </div>

      {/* Summary */}

      <div className="mb-5">

        <h5 className="fw-bold mb-3">
          Summary
        </h5>

        <p className="text-muted">
          {data.ai_summary || data.summary}
        </p>

      </div>

      {/* Skills */}

      <div className="mb-5">

        <h5 className="fw-bold mb-3">
          Skills
        </h5>

        <div className="d-flex flex-wrap gap-2">

          {
            skillsArray.length > 0 ? (

              skillsArray.map((skill, index) => (

                <span
                  key={index}
                  className="badge bg-dark px-3 py-2"
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

      <div className="mb-5">

        <h5 className="fw-bold mb-3">
          Experience
        </h5>

        {
          experienceData.length > 0 ? (

            experienceData.map((exp, index) => (

              <div
                key={index}
                className="mb-4"
              >

                <div className="d-flex justify-content-between">

                  <h6 className="fw-bold">
                    {exp.role}
                  </h6>

                  <span className="text-muted">
                    {exp.duration}
                  </span>

                </div>

                <p className="text-secondary fw-semibold mb-2">
                  {exp.company}
                </p>

                <p
                  className="text-muted"
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

            <p
              className="text-muted"
              style={{
                whiteSpace: "pre-line",
              }}
            >
              {data.ai_experience || data.experience}
            </p>

          )
        }

      </div>

      {/* Projects */}

      <div className="mb-5">

        <h5 className="fw-bold mb-3">
          Projects
        </h5>

        {
          projectData.length > 0 ? (

            projectData.map((project, index) => (

              <div
                key={index}
                className="mb-4"
              >

                <div className="d-flex justify-content-between align-items-center">

                  <h6 className="fw-bold">
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

                <p className="text-secondary fw-semibold">
                  {project.technologies}
                </p>

                <p
                  className="text-muted"
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

            <p
              className="text-muted"
              style={{
                whiteSpace: "pre-line",
              }}
            >
              {data.projects}
            </p>

          )
        }

      </div>

      {/* Education */}

      <div>

        <h5 className="fw-bold mb-3">
          Education
        </h5>

        <p className="text-muted">
          {data.education}
        </p>

      </div>

    </div>
  )
}

export default MinimalTemplate