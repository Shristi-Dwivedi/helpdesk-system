from rest_framework import generics, filters
from .models import KnowledgeBase
from .serializers import KnowledgeBaseSerializer

class KnowledgeListView(generics.ListAPIView):
    queryset = KnowledgeBase.objects.all()
    serializer_class = KnowledgeBaseSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['question', 'answer', 'title']
