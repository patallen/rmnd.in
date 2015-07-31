from django.db import models
from django.contrib.auth.models import User


class Reminder(models.Model):
    title = models.CharField(max_length=120, blank=False)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    remind_date = models.DateTimeField(null=True)
    complete = models.BooleanField(default=False)
    owner = models.ForeignKey(User, related_name='reminders')

    def __str__(self):
        return self.title
