# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reminders', '0011_reminder_priority'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reminder',
            name='priority',
            field=models.CharField(max_length=1, choices=[('H', 'High'), ('M', 'Medium'), ('L', 'Low')], default='L'),
        ),
    ]
