from reminders.models import Reminder

from celery import shared_task
from django.core.mail import send_mail
from django.utils import timezone
import logging
import os

# TODO: Get rid of logging stuff for production
cdir = os.path.dirname(os.path.realpath(__file__))
cdirup = os.path.dirname(cdir)
cfile = cdirup + '/collect.log'

log = logging.getLogger(__name__)
log.setLevel(logging.DEBUG)
loghandle = logging.FileHandler(cfile, mode="a")
log.addHandler(loghandle)


@shared_task
def send_email(rem):
    """
    Task called by collect_reminders task that takes a reminder
    and sends it's contents the the appropriate user via email.
    """
    email = rem.owner.email
    username = rem.owner.username

    subject = "!Reminder from rmnd.in"
    title = rem.title
    notes = rem.notes
    date = rem.remind_date

    body = ("{}, you have a reminder:\n\n{} on {}\n\nNotes:\n{}"
            .format(username, title, date, notes))
    send_mail(subject, body, 'reminders@rmnd.in',
              [email], fail_silently=False)


@shared_task
def collect_reminders():
    """
    Task called by CeleryBeat that gets all incomplete and past-due
    reminders to be sent by email to users.
    """
    incomplete = Reminder.objects.filter(complete=False)
    rems_to_send = incomplete.filter(remind_date__lte=timezone.now())

    # Save each reminder as complete
    # Add each reminder as send_email task
    for rem in rems_to_send:
        rem.complete = True
        rem.save()
        send_email.delay(rem)
        log.debug("\nTitle: {} \nComplete: {}".format(rem.title, rem.complete))
