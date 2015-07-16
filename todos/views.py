from django.shortcuts import get_object_or_404
from todos.serializers import (
        UserSerializer, TodoListSerializer, TodoItemSerializer
)
from django.contrib.auth.models import User
from todos.models import TodoList, TodoItem

from rest_framework import viewsets
from rest_framework_extensions.mixins import NestedViewSetMixin


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class TodoListViewSet(viewsets.ModelViewSet):
    serializer_class = TodoListSerializer

    def get_queryset(self):
        return self.request.user.todolists.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class TodoItemViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer

    def perform_create(self, serializer):
        parent_list = get_object_or_404(
                TodoList, pk=self.kwargs['parent_lookup_todo_list_id']
        )
        # TODO: Set permissions
        # Only owners should be able to create items
        # In their lists.
        return serializer.save(todo_list=parent_list)
