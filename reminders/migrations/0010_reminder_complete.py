# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reminders', '0009_auto_20150727_1955'),
    ]

    operations = [
        migrations.AddField(
            model_name='reminder',
            name='complete',
            field=models.BooleanField(default=False),
        ),
    ]
