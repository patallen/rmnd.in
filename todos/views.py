from todos.serializers import UserSerializer, TodoListSerializer
from django.contrib.auth.models import User
from rest_framework import viewsets
from todos.permissions import IsOwner


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
