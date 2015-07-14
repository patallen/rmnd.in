# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TodoItem',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, auto_created=True, verbose_name='ID')),
                ('task', models.CharField(max_length=120)),
                ('priority', models.CharField(max_length=2, choices=[('L', 'Low'), ('M', 'Medium'), ('H', 'High')])),
                ('due_date', models.DateField()),
                ('completed', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='TodoList',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, auto_created=True, verbose_name='ID')),
                ('title', models.CharField(max_length=120)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('public', models.BooleanField(default=False)),
            ],
        ),
    ]
