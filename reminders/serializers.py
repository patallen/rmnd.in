from django.contrib.auth.models import User
from rest_framework import serializers
from reminders.models import Reminder


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


class ReminderSerializer(serializers.ModelSerializer):
    priority = serializers.ChoiceField(choices=Reminder.PRIORITY_CHOICES)
    priority_display = serializers.CharField(source='get_priority_display',
                                             read_only=True)

    class Meta:
        model = Reminder
        read_only_fields = ('owner',)
