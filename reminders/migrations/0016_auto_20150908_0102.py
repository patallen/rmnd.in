# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0006_require_contenttypes_0002'),
        ('reminders', '0015_auto_20150907_1949'),
    ]

    operations = [
        migrations.AddField(
            model_name='rmndinuser',
            name='groups',
            field=models.ManyToManyField(help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', verbose_name='groups', related_query_name='user', blank=True, to='auth.Group'),
        ),
        migrations.AddField(
            model_name='rmndinuser',
            name='is_superuser',
            field=models.BooleanField(verbose_name='superuser status', help_text='Designates that this user has all permissions without explicitly assigning them.', default=False),
        ),
        migrations.AddField(
            model_name='rmndinuser',
            name='user_permissions',
            field=models.ManyToManyField(help_text='Specific permissions for this user.', related_name='user_set', verbose_name='user permissions', related_query_name='user', blank=True, to='auth.Permission'),
        ),
    ]
