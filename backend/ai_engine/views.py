from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from resumes.models import Resume

from .groq_engine import (
    analyze_resume,
    generate_interview_questions
)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ai_resume_feedback(request, resume_id):

    resume = Resume.objects.filter(id=resume_id).first()

    if not resume:
        return Response(
            {"error": "Resume not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    ai_feedback = analyze_resume(
        resume.extracted_text
    )

    return Response({
        "message": "AI feedback generated",
        "feedback": ai_feedback
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ai_interview_questions(
    request,
    resume_id
):

    target_role = request.data.get(
        'target_role'
    )

    resume = Resume.objects.filter(id=resume_id).first()

    if not resume:
        return Response(
            {"error": "Resume not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    questions = generate_interview_questions(
        resume.skills,
        target_role
    )

    return Response({
        "message": "Interview questions generated",
        "questions": questions
    })
    
