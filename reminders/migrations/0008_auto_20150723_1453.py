# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reminders', '0007_auto_20150720_2031'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reminder',
            name='task',
        ),
        migrations.AlterField(
            model_name='reminder',
            name='notes',
            field=models.TextField(blank=True),
        ),
    ]
