ROLE_SKILLS = {

    "python developer": [
        "python",
        "django",
        "flask",
        "fastapi",
        "rest api",
        "postgresql",
        "mongodb",
        "git",
        "github",
        "docker",
        "oop",
        "api",
    ],

    "full stack developer": [
        "python",
        "django",
        "react",
        "javascript",
        "html",
        "css",
        "bootstrap",
        "tailwind",
        "rest api",
        "postgresql",
        "mongodb",
        "git",
        "github",
        "jwt",
    ],

    "frontend developer": [
        "react",
        "javascript",
        "html",
        "css",
        "bootstrap",
        "tailwind",
        "redux",
        "typescript",
        "git",
    ],

    "backend developer": [
        "python",
        "django",
        "flask",
        "fastapi",
        "rest api",
        "postgresql",
        "mongodb",
        "docker",
        "jwt",
        "git",
    ],

    "data analyst": [
        "python",
        "pandas",
        "numpy",
        "sql",
        "excel",
        "power bi",
        "tableau",
        "data analysis",
        "statistics",
    ],

    "machine learning engineer": [
        "python",
        "machine learning",
        "tensorflow",
        "pytorch",
        "scikit-learn",
        "numpy",
        "pandas",
        "deep learning",
        "nlp",
    ]
}


def calculate_ats_score(user_skills, target_role):

    target_role = target_role.lower().strip()

    required_skills = ROLE_SKILLS.get(target_role, [])

    if not required_skills:

        return {
            "ats_score": 0,
            "matched_skills": [],
            "missing_skills": [],
            "suggestions": [
                "Target role not found in ATS database"
            ]
        }

    # Convert all user skills to lowercase
    user_skills_lower = [
        skill.lower().strip()
        for skill in user_skills
    ]

    matched_skills = []
    missing_skills = []

    for skill in required_skills:

        matched = any(
            skill in user_skill
            or user_skill in skill
            for user_skill in user_skills_lower
        )

        if matched:
            matched_skills.append(skill)
        else:
            missing_skills.append(skill)

    # ATS SCORE
    ats_score = int(
        (len(matched_skills) / len(required_skills)) * 100
    )

    # Suggestions
    suggestions = []

    if ats_score >= 80:

        suggestions.append(
            "Excellent resume match for this role"
        )

    elif ats_score >= 60:

        suggestions.append(
            "Good profile but can be improved with more relevant skills"
        )

    else:

        suggestions.append(
            "Add more role-specific technical skills"
        )

    if "projects" not in user_skills_lower:

        suggestions.append(
            "Add 2-3 strong projects to improve ATS ranking"
        )

    if "github" not in user_skills_lower:

        suggestions.append(
            "Add GitHub profile/projects"
        )

    if len(missing_skills) > 0:

        suggestions.append(
            f"Recommended skills: {', '.join(missing_skills[:4])}"
        )

    return {

        "ats_score": ats_score,

        "matched_skills": matched_skills,

        "missing_skills": missing_skills,

        "suggestions": suggestions
    }