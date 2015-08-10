# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reminders', '0010_reminder_complete'),
    ]

    operations = [
        migrations.AddField(
            model_name='reminder',
            name='priority',
            field=models.CharField(default='L', max_length=2, choices=[('H', 'High'), ('M', 'Medium'), ('L', 'Low')]),
        ),
    ]
