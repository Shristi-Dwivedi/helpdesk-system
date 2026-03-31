from django.utils import timezone
from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from .models import Ticket
from .serializers import TicketSerializer, CreateTicketSerializer, AdminTicketUpdateSerializer


class TicketListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role == "admin":
            return Ticket.objects.all().order_by('-created_at')

        return Ticket.objects.filter(user=user).order_by('-created_at')

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CreateTicketSerializer
        return TicketSerializer

    def perform_create(self, serializer):
        if self.request.user.role != "user":
            raise PermissionDenied("Only normal users can create tickets.")
        serializer.save(user=self.request.user)


class TicketAdminUpdateView(generics.UpdateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = AdminTicketUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        if request.user.role != "admin":
            raise PermissionDenied("Only admin can assign or change ticket status.")
        return super().update(request, *args, **kwargs)

    def perform_update(self, serializer):
        ticket = serializer.save()

        if ticket.status == "resolved" and ticket.resolved_at is None:
            ticket.resolved_at = timezone.now()
            ticket.save()

        if ticket.status != "resolved":
            ticket.resolved_at = None
            ticket.save()