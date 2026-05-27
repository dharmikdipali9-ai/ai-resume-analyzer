from django.urls import path

from .views import (
    upload_resume,
    parse_resume,
    ats_score_api,
    user_resumes,
    download_report
)

urlpatterns = [

    path(
        'upload/',
        upload_resume
    ),

    path(
        'parse/<str:resume_id>/',
        parse_resume
    ),

    path(
        'ats-score/<str:resume_id>/',
        ats_score_api
    ),
    path(
    'my-resumes/',
    user_resumes
    ),
    
    path(
    'report/<int:resume_id>/',
    download_report
),
]