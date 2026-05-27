from django.urls import path

from .views import (
    ai_resume_feedback,
    ai_interview_questions
)

urlpatterns = [

    path(
        'resume-feedback/<str:resume_id>/',
        ai_resume_feedback
    ),

    path(
        'interview-questions/<str:resume_id>/',
        ai_interview_questions
    ),
]