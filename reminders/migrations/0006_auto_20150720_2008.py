# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reminders', '0005_auto_20150716_1324'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todoitem',
            name='todo_list',
        ),
        migrations.DeleteModel(
            name='TodoItem',
        ),
    ]
