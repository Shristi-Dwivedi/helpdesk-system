from rest_framework import serializers
from .models import Ticket

class TicketSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)
    assigned_to_username = serializers.CharField(source='assigned_to.username', read_only=True)

    class Meta:
        model = Ticket
        fields = [
            'id',
            'user',
            'user_username',
            'title',
            'description',
            'status',
            'priority',
            'assigned_to',
            'assigned_to_username',
            'created_at',
            'updated_at',
            'resolved_at',
        ]
        read_only_fields = ['user', 'status', 'assigned_to', 'resolved_at', 'created_at', 'updated_at']


class CreateTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['title', 'description', 'priority']


class AdminTicketUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['status', 'assigned_to', 'priority']