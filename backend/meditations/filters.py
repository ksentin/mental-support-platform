import django_filters
from .models import Meditation

class MeditationFilter(django_filters.FilterSet):
    min_duration = django_filters.NumberFilter(field_name="duration", lookup_expr='gte')
    max_duration = django_filters.NumberFilter(field_name="duration", lookup_expr='lte')
    type = django_filters.CharFilter(field_name="type", lookup_expr='exact')

    class Meta:
        model = Meditation
        fields = ['type', 'min_duration', 'max_duration']
