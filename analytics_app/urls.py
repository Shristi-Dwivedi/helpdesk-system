from django.urls import path
from .views import TicketTrendsView, ResolutionTimeAnalysisView

urlpatterns = [
    path("ticket-trends/", TicketTrendsView.as_view(), name="ticket-trends"),
    path("resolution-time/", ResolutionTimeAnalysisView.as_view(), name="resolution-time"),
]