from django.urls import path

from .views import register_user, login_user

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('register/', register_user),

    path('login/', login_user),

    path('refresh/', TokenRefreshView.as_view()),
]