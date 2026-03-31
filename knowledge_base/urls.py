from django.urls import path
from .views import KnowledgeListView

urlpatterns = [
    path('kb/', KnowledgeListView.as_view(), name='kb-list'),
]
