from todos.serializers import UserSerializer, TodoListSerializer
from django.contrib.auth.models import User

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
