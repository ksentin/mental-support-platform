#/mood/urls.py

from django.urls import path
from .views import MoodEntryListCreateView, MoodEntryDetailView

urlpatterns = [
    path('entries/', MoodEntryListCreateView.as_view(), name='mood-entry-list-create'),
    path('entries/<int:pk>/', MoodEntryDetailView.as_view(), name='mood-entry-detail'),
]
