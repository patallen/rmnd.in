# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reminders', '0016_auto_20150908_0102'),
    ]

    operations = [
        migrations.AddField(
            model_name='rmndinuser',
            name='is_active',
            field=models.BooleanField(default=False),
        ),
    ]
