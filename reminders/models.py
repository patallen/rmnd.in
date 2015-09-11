from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin


class EmailUserManager(BaseUserManager):

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', False)
        extra_fields.setdefault('is_active', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        return self._create_user(email, password, **extra_fields)


class RmndinUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(blank=False, unique=True)
    is_active = models.BooleanField(default=False)

    objects = EmailUserManager()

    USERNAME_FIELD = 'email'


class UserProfile(models.Model):
    user = models.OneToOneField(RmndinUser)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)


class Reminder(models.Model):
    HIGH = 'H'
    MEDIUM = 'M'
    LOW = 'L'
    PRIORITY_CHOICES = (
        (HIGH, 'High'),
        (MEDIUM, 'Medium'),
        (LOW, 'Low'),
    )

    title = models.CharField(max_length=120, blank=False)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    remind_date = models.DateTimeField(null=True)
    complete = models.BooleanField(default=False)
    on_hold = models.BooleanField(default=False)
    priority = models.CharField(max_length=1,
                                choices=PRIORITY_CHOICES,
                                default=LOW)
    owner = models.ForeignKey(RmndinUser, related_name='reminders')

    def __str__(self):
        return self.title
