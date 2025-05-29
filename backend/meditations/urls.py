from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MeditationViewSet

router = DefaultRouter()
router.register(r'meditations', MeditationViewSet, basename='meditation')

urlpatterns = [
    path('', include(router.urls)),
]
