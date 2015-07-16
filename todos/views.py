from todos.serializers import (
        UserSerializer, TodoListSerializer, TodoItemSerializer
)
from django.contrib.auth.models import User
from todos.models import TodoList, TodoItem

from rest_framework import generics
from rest_framework import viewsets


class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'


class TodoListViewSet(viewsets.ModelViewSet):
    serializer_class = TodoListSerializer
    queryset = TodoItem.objects.all()

    def get_queryset(self):
        return self.request.user.todolists.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class TodoItemListCreate(generics.ListCreateAPIView):
    serializer_class = TodoItemSerializer
    lookup_field = 'id'
    queryset = TodoItem.objects.all()

    def perform_create(self, serializer):
        parent = TodoList.objects.get(pk=self.kwargs['tlid'])
        serializer.save(todo_list=parent)


class TodoItemDetail(generics.RetrieveAPIView):
    queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer
    lookup_field = 'id'
