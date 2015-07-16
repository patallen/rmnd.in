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
    # TODO: Set the parent of the TodoItem
