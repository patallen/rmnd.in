# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reminders', '0008_auto_20150723_1453'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reminder',
            name='remind_date',
            field=models.DateTimeField(null=True),
        ),
    ]
