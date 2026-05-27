from django.db import models
from django.conf import settings


class InterviewSession(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='interviews'
    )

    role = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    skills = models.JSONField(
        default=list,
        blank=True
    )

    conversation = models.JSONField(
        default=list,
        blank=True
    )

    final_feedback = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.user.username} - {self.role}"