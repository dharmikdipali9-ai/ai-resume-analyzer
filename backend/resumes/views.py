import os
from uuid import uuid4
from .ats import calculate_ats_score

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.http import FileResponse
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)
from reportlab.lib.styles import getSampleStyleSheet
from io import BytesIO

from .models import Resume
from .parser import (
    extract_text_from_pdf,
    extract_email,
    extract_phone,
    extract_skills,
    extract_name
)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_resume(request):

    uploaded_file = request.FILES.get('resume')

    if not uploaded_file:
        return Response({"error": "No file uploaded"}, status=400)

    unique_filename = f"{uuid4()}_{uploaded_file.name}"

    fs = FileSystemStorage(location=os.path.join(settings.MEDIA_ROOT, 'resumes'))
    filename = fs.save(unique_filename, uploaded_file)

    # 🔥 IMPORTANT FIX HERE
    user = request.user   # ✅ FIXED

    resume = Resume(
        user=request.user,
        file_name=filename,
        file_path=f"resumes/{filename}"
    )

    resume.save()

    return Response({
        "message": "Resume uploaded successfully",
        "resume_id": str(resume.id)
    })



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def parse_resume(request, resume_id):

    resume = Resume.objects.filter(id=resume_id).first()

    if not resume:
        return Response(
            {"error": "Resume not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    try:
        file_path = os.path.join(
            settings.MEDIA_ROOT,
            'resumes',
            resume.file_name
        )

        extracted_text = extract_text_from_pdf(file_path)

        email = extract_email(extracted_text)
        phone = extract_phone(extracted_text)
        skills = extract_skills(extracted_text)
        name = extract_name(extracted_text)

        resume.extracted_text = extracted_text
        resume.skills = skills
        resume.parsed_data = {
            "name": name,
            "email": email,
            "phone": phone,
            "skills": skills
        }

        resume.save()

        return Response({
            "message": "Resume parsed successfully",
            "data": resume.parsed_data
        })

    except Exception as e:
        return Response({
            "error": str(e)
        }, status=500)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ats_score_api(request, resume_id):

    target_role = request.data.get('target_role')

    resume = Resume.objects.filter(id=resume_id).first()

    if not resume:
        return Response(
            {"error": "Resume not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    result = calculate_ats_score(
        resume.skills,
        target_role
    )

    # Save ATS results
    resume.ats_score = str(result['ats_score'])

    resume.missing_skills = result['missing_skills']

    resume.suggestions = result['suggestions']

    resume.save()

    return Response({
        "message": "ATS score generated",
        "result": result
    })
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_resumes(request):

    resumes = Resume.objects.filter(
        user=request.user
    ).order_by('-uploaded_at')

    data = []

    for resume in resumes:

        data.append({

            "id": resume.id,

            "file_name": resume.file_name,

            "ats_score": resume.ats_score,

            "uploaded_at": resume.uploaded_at
        })

    return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def download_report(request, resume_id):

    resume = Resume.objects.filter(id=resume_id).first()

    if not resume:
        return Response(
            {"error": "Resume not found"},
            status=404
        )

    buffer = BytesIO()

    doc = SimpleDocTemplate(buffer)

    styles = getSampleStyleSheet()

    elements = []

    # Title
    elements.append(
        Paragraph(
            "AI Resume Analysis Report",
            styles['Title']
        )
    )

    elements.append(Spacer(1, 20))

    # User Details
    parsed = resume.parsed_data or {}

    elements.append(
        Paragraph(
            f"<b>Name:</b> {parsed.get('name', '')}",
            styles['BodyText']
        )
    )

    elements.append(
        Paragraph(
            f"<b>Email:</b> {parsed.get('email', '')}",
            styles['BodyText']
        )
    )

    elements.append(Spacer(1, 12))

    # Skills
    skills = ", ".join(resume.skills)

    elements.append(
        Paragraph(
            f"<b>Skills:</b> {skills}",
            styles['BodyText']
        )
    )

    elements.append(Spacer(1, 12))

    # ATS Score
    elements.append(
        Paragraph(
            f"<b>ATS Score:</b> {resume.ats_score}%",
            styles['BodyText']
        )
    )

    elements.append(Spacer(1, 12))

    # Missing Skills
    missing = ", ".join(resume.missing_skills)

    elements.append(
        Paragraph(
            f"<b>Missing Skills:</b> {missing}",
            styles['BodyText']
        )
    )

    elements.append(Spacer(1, 12))

    # Suggestions
    for suggestion in resume.suggestions:

        elements.append(
            Paragraph(
                f"• {suggestion}",
                styles['BodyText']
            )
        )

    doc.build(elements)

    buffer.seek(0)

    return FileResponse(
        buffer,
        as_attachment=True,
        filename='resume_report.pdf'
    )