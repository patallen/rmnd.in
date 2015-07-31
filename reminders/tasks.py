from celery import shared_task
from django.core.mail import send_mail


@shared_task
def print_reminder(reminder):
    print(reminder.title)


@shared_task
def send_email():
    send_mail('Subject',
              'Message',
              'prallen90@gmail.com',
              ['prallen90@gmail.com'],
              fail_silently=False)
