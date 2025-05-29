from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Meditation
from .serializers import MeditationSerializer
from .filters import MeditationFilter

class MeditationViewSet(viewsets.ModelViewSet):
    queryset = Meditation.objects.all().order_by('-created_at')
    serializer_class = MeditationSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_class = MeditationFilter
    ordering_fields = ['duration', 'created_at']
    search_fields = ['title', 'description']
