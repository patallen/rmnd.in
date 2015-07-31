from reminders.models import Reminder
from django.utils import timezone
import os
import logging

from reminders.tasks import print_reminder

cdir = os.path.dirname(os.path.realpath(__file__))
cdirup = os.path.dirname(cdir)
cfile = cdirup + '/collect.log'

log = logging.getLogger(__name__)
log.setLevel(logging.DEBUG)
loghandle = logging.FileHandler(cfile, mode="a")
log.addHandler(loghandle)


def collect_reminders():
    """
    Function collects all reminders that are not complete
    and are past the remind_date. This runs on a cronjob
    every X minutes.
    """

    # Collect all reminders not complete and past due
    try:
        incomplete_rems = Reminder.objects.filter(complete=False)
        reminders = incomplete_rems.filter(remind_date__lte=timezone.now())
        log.debug(reminders)
    except:
        log.debug("Unable to find reminders")

    for rem in reminders:
        # TODO: For each reminder, start a task
        print_reminder.delay(rem)
        # Set complete to true so the reminder isn't picked up again
        # rem.complete = True
        # rem.save()

    log.debug("-------------------------")
