from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth import authenticate

from rest_framework_simplejwt.tokens import RefreshToken

from .models import User


@api_view(['POST'])
def register_user(request):

    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    existing_user = User.objects.filter(
        email=email
    ).first()

    if existing_user:
        return Response(
            {"error": "Email already exists"},
            status=400
        )

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    return Response({
        "message": "User registered successfully"
    })


@api_view(['POST'])
def login_user(request):

    email = request.data.get('email')
    password = request.data.get('password')

    user_obj = User.objects.filter(
        email=email
    ).first()

    if not user_obj:
        return Response(
            {"error": "Invalid email"},
            status=400
        )

    user = authenticate(
        username=user_obj.username,
        password=password
    )

    if user is None:
        return Response(
            {"error": "Invalid password"},
            status=400
        )

    refresh = RefreshToken.for_user(user)

    return Response({

        "access": str(refresh.access_token),

        "refresh": str(refresh),

        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    })