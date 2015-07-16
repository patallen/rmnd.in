from django.db import models
from django.contrib.auth.models import User


class TodoList(models.Model):
    title = models.CharField(max_length=120, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    public = models.BooleanField(default=False)
    owner = models.ForeignKey(User, related_name='todolists')

    def __str__(self):
        return self.title


class TodoItem(models.Model):
    LOW = 'L'
    MEDIUM = 'M'
    HIGH = 'H'
    PRIORITY_CHOICES = (
        (LOW, 'Low'),
        (MEDIUM, 'Medium'),
        (HIGH, 'High'),
    )
    task = models.CharField(max_length=120, blank=False)
    priority = models.CharField(max_length=2, choices=PRIORITY_CHOICES)
    due_date = models.DateField(null=True, blank=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    todo_list = models.ForeignKey(TodoList)

    def __str__(self):
        return self.task
