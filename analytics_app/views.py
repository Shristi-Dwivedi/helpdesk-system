from django.db.models import Count, Avg, F, ExpressionWrapper, DurationField
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from tickets.models import Ticket


class TicketTrendsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != "admin":
            raise PermissionDenied("Only admin can view analytics.")

        data = Ticket.objects.values("status").annotate(count=Count("id")).order_by("status")

        status_map = {
            "open": 0,
            "in_progress": 0,
            "resolved": 0,
            "closed": 0,
        }

        for item in data:
            status_map[item["status"]] = item["count"]

        return Response(status_map)


class ResolutionTimeAnalysisView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != "admin":
            raise PermissionDenied("Only admin can view analytics.")

        resolved_tickets = Ticket.objects.filter(resolved_at__isnull=False)

        avg_resolution = resolved_tickets.annotate(
            resolution_duration=ExpressionWrapper(
                F("resolved_at") - F("created_at"),
                output_field=DurationField()
            )
        ).aggregate(avg_time=Avg("resolution_duration"))

        avg_time = avg_resolution["avg_time"]

        if avg_time:
            total_seconds = int(avg_time.total_seconds())
            days = total_seconds // 86400
            hours = (total_seconds % 86400) // 3600
            minutes = (total_seconds % 3600) // 60
        else:
            days = hours = minutes = 0

        return Response({
            "average_resolution_time": str(avg_time) if avg_time else "0:00:00",
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "resolved_ticket_count": resolved_tickets.count(),
        })