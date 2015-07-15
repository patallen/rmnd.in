from django.contrib.auth.models import User
from rest_framework import serializers
from todos.models import TodoList, TodoItem


class UserSerializer(serializers.ModelSerializer):

    # first_name and last_name not necessary to sign up
    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = (super(UserSerializer, self)
                      .get_validation_exclusions(*args, **kwargs))
        return exclusions + ['first_name', 'last_name']

    class Meta:
        model = User
        fields = ('username', 'first_name',
                  'last_name', 'email', 'password')
        write_only_fields = ('password',)


class TodoListSerializer(serializers.ModelSerializer):

    class Meta:
        model = TodoList
        read_only_fields = ['owner']


class TodoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoItem
        fields = ('id', 'task', 'priority', 'due_date',
                  'completed', 'created_at', 'updated_at')
        read_only_fields = ('created_at', 'updated_at')
 