from django.urls import path

from .views import (
    start_interview,
    continue_interview
)

urlpatterns = [

    path(
        'start/',
        start_interview
    ),

    path(
        'chat/<str:session_id>/',
        continue_interview
    ),
]