from reminders.models import Reminder
from django.contrib.auth.models import User
from django.utils import timezone
import os
import logging

cdir = os.path.dirname(os.path.realpath(__file__))
cdirup = os.path.dirname(cdir)
cfile = cdirup + '/collect.log'

log = logging.getLogger(__name__)
log.setLevel(logging.DEBUG)
loghandle = logging.FileHandler(cfile, mode="a")
log.addHandler(loghandle)

def collect_reminders():
    rem = Reminder.objects.create(title='Cron',
                                  remind_date=timezone.now(),
                                  owner=User.objects.first())
    log.debug(rem)
