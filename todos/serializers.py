from django.conf.urls import url, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets

from todos.models import TodoList, TodoItem

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')

class TodoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoList
        fields = ('title', 'public', 'owner')

class TodoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoItem
        fields = ('task', 'priority', 'due_date',
                  'completed', 'created_at', 'updated_at')
