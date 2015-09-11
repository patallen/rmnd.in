# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0006_require_contenttypes_0002'),
    ]

    operations = [
        migrations.CreateModel(
            name='RmndinUser',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, primary_key=True, auto_created=True)),
                ('password', models.CharField(verbose_name='password', max_length=128)),
                ('last_login', models.DateTimeField(verbose_name='last login', blank=True, null=True)),
                ('is_superuser', models.BooleanField(verbose_name='superuser status', help_text='Designates that this user has all permissions without explicitly assigning them.', default=False)),
                ('email', models.EmailField(unique=True, max_length=254)),
                ('is_active', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(verbose_name='groups', to='auth.Group', related_query_name='user', related_name='user_set', help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', blank=True)),
                ('user_permissions', models.ManyToManyField(verbose_name='user permissions', to='auth.Permission', related_query_name='user', related_name='user_set', help_text='Specific permissions for this user.', blank=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Reminder',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, primary_key=True, auto_created=True)),
                ('title', models.CharField(max_length=120)),
                ('notes', models.TextField(blank=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('remind_date', models.DateTimeField(null=True)),
                ('complete', models.BooleanField(default=False)),
                ('on_hold', models.BooleanField(default=False)),
                ('priority', models.CharField(default='L', max_length=1, choices=[('H', 'High'), ('M', 'Medium'), ('L', 'Low')])),
                ('owner', models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name='reminders')),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, primary_key=True, auto_created=True)),
                ('first_name', models.CharField(max_length=64)),
                ('last_name', models.CharField(max_length=64)),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
