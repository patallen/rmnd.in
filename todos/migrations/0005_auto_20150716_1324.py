# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0004_auto_20150715_0031'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todoitem',
            name='todo_list',
            field=models.ForeignKey(to='todos.TodoList', related_name='todoitems'),
        ),
        migrations.AlterField(
            model_name='todolist',
            name='owner',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name='todolists'),
        ),
    ]
