from reminders.models import Reminder

from django.template.loader import get_template
from django.template import Context
from django.core.mail import EmailMultiAlternatives

from celery import shared_task
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
    subject = "Reminder from rmnd.in!"
    plaintext = get_template('email/reminder.txt')
    htmly = get_template('email/reminder.html')
    d = Context({'title': rem.title, 'notes': rem.notes, 'updated_at': rem.updated_at})

    text_content = plaintext.render(d)
    html_content = htmly.render(d)
    
    message = EmailMultiAlternatives(subject, text_content, 'reminders@rmnd.in', [email])
    message.attach_alternative(html_content, "text/html")
    message.send()


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
