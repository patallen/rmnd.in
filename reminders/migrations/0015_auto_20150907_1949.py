# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reminders', '0014_rmndinuser'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reminder',
            name='owner',
            field=models.ForeignKey(to='reminders.RmndinUser', related_name='reminders'),
        ),
    ]
