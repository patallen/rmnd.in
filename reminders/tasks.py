from celery import shared_task
from django.core.mail import send_mail
import logging
import os

cdir = os.path.dirname(os.path.realpath(__file__))
cdirup = os.path.dirname(cdir)
cfile = cdirup + '/collect.log'

log = logging.getLogger(__name__)
log.setLevel(logging.DEBUG)
loghandle = logging.FileHandler(cfile, mode="a")
log.addHandler(loghandle)


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


@shared_task
def collect_reminders():
    log.debug("please fucking work")
