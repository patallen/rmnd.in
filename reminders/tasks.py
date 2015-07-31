from celery import shared_task


@shared_task
def print_reminder(reminder):
    print(reminder.title)
