from todos.serializers import UserSerializer, TodoListSerializer, TodoItemSerializer
from django.contrib.auth.models import User
from todos.models import TodoList, TodoItem

from rest_framework import generics


class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'


class TodoListListCreate(generics.ListCreateAPIView):
    serializer_class = TodoListSerializer

    def get_queryset(self):
        return self.request.user.todolists.all()
   
    # Add the user to the serializer and save
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class TodoListDetail(generics.RetrieveAPIView):
    queryset = TodoList.objects.all()
    serializer_class = TodoListSerializer
    lookup_field = 'id'


class TodoItemListCreate(generics.ListCreateAPIView):
    serializer_class = TodoItemSerializer
    lookup_field = 'id'
    
    def get_queryset(self):
        return TodoItem.objects.all()
    
    def perform_create(self, serializer):
        parent = TodoList.objects.get(pk=self.kwargs['id'])
        serializer.save(todo_list=parent)