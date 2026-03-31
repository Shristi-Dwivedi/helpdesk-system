from django.urls import path
from .views import TicketListCreateView, TicketAdminUpdateView

urlpatterns = [
    path('', TicketListCreateView.as_view(), name='ticket-list-create'),
    path('<int:pk>/admin-update/', TicketAdminUpdateView.as_view(), name='ticket-admin-update'),
]