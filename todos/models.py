from django.db import models
from django.contrib.auth.models import User


class TodoList(models.Model):
    title = models.CharField(max_length=120, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    public = models.BooleanField(default=False)
    owner = models.ForeignKey(User, related_name='todolists')

    def __str__(self):
        return self.title
