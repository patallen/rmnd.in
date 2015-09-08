from reminders.serializers import UserSerializer, ReminderSerializer
from django.contrib.auth.models import User
from rest_framework import viewsets
from reminders.permissions import IsOwner
from django.contrib.auth import get_user_model

User = get_user_model()
class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class ReminderViewSet(viewsets.ModelViewSet):
    permission_classes = (IsOwner,)
    serializer_class = ReminderSerializer

    def get_queryset(self):
        return self.request.user.reminders.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
