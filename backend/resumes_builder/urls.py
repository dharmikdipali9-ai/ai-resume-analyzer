from django.urls import path
from .views import ResumeCreateAPIView

urlpatterns = [
    path('create-resume/', ResumeCreateAPIView.as_view()),
]