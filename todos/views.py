from django.shortcuts import get_object_or_404
from todos.serializers import (
        UserSerializer, TodoListSerializer, TodoItemSerializer
)
from django.contrib.auth.models import User
from todos.models import TodoList, TodoItem

from rest_framework import viewsets
from rest_framework_extensions.mixins import NestedViewSetMixin

from todos.permissions import IsOwner, IsOwnerOfList


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class TodoListViewSet(viewsets.ModelViewSet):
    permission_classes = (IsOwner,)
    serializer_class = TodoListSerializer

    def get_queryset(self):
        return self.request.user.todolists.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class TodoItemViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (IsOwnerOfList,)
    serializer_class = TodoItemSerializer
    
    def dispatch(self, request, *args, **kwargs):
        self.parent_list = get_object_or_404(
            TodoList, pk=int(kwargs['parent_lookup_todo_list_id'])
        )
        return super(TodoItemViewSet, self).dispatch(request, *args, **kwargs)
        
    def get_queryset(self):
        return self.parent_list.todoitems.all()

    def perform_create(self, serializer):
        return serializer.save(todo_list=self.parent_list)
