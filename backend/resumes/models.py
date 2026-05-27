from django.db import models
from django.conf import settings


class Resume(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    file_name = models.CharField(max_length=255)

    file_path = models.CharField(max_length=500)

    extracted_text = models.TextField(
        blank=True,
        null=True
    )

    skills = models.JSONField(
        default=list,
        blank=True
    )

    parsed_data = models.JSONField(
        default=dict,
        blank=True
    )

    ats_score = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )

    missing_skills = models.JSONField(
        default=list,
        blank=True
    )

    suggestions = models.JSONField(
        default=list,
        blank=True
    )

    uploaded_at = models.DateTimeField(
        auto_now_add=True
    )