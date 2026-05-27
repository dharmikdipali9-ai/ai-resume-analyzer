from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Resume
from .serializer import ResumeSerializer
from .ai_service import improve_text


class ResumeCreateAPIView(APIView):

    def post(self, request):

        data = request.data

        use_ai = data.get("use_ai", True)

        # AI Processing

        if use_ai:

            ai_summary = improve_text(
                data.get("summary", ""),
                "summary"
            )

            ai_experience = improve_text(
                data.get("experience", ""),
                "experience"
            )

            ai_skills = improve_text(
                data.get("skills", ""),
                "skills"
            )

        else:

            ai_summary = data.get("summary", "")

            ai_experience = data.get("experience", "")

            ai_skills = data.get("skills", "")

        # Save Resume

        resume = Resume.objects.create(

            full_name=data.get("full_name"),

            email=data.get("email"),

            phone=data.get("phone"),

            summary=data.get("summary"),

            skills=data.get("skills"),
            ai_skills=ai_skills,

            experience=data.get("experience"),
            projects=data.get("projects", ""),

            education=data.get("education"),

            ai_summary=ai_summary,

            ai_experience=ai_experience

        )

        serializer = ResumeSerializer(resume)

        return Response(serializer.data)