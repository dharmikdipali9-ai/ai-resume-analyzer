from django.db import models

class Resume(models.Model):
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    
    summary = models.TextField()
    skills = models.TextField()
    experience = models.TextField()
    projects = models.TextField(blank=True, null=True)
    education = models.TextField()
    ai_skills = models.TextField(blank=True, null=True)
    ai_summary = models.TextField(blank=True, null=True)
    ai_experience = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)