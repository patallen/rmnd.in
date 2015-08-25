# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reminders', '0012_auto_20150810_1627'),
    ]

    operations = [
        migrations.AddField(
            model_name='reminder',
            name='on_hold',
            field=models.BooleanField(default=False),
        ),
    ]
