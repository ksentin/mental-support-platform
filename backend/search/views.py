from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q

from articles.models import Article
from meditations.models import Meditation

from articles.serializers import ArticleSerializer
from meditations.serializers import MeditationSerializer

class GlobalSearchView(APIView):
    def get(self, request):
        query = request.GET.get('q', '').strip()

        if not query:
            return Response({'results': []})

        articles = Article.objects.filter(Q(title__icontains=query) | Q(content__icontains=query))
        meditations = Meditation.objects.filter(Q(title__icontains=query) | Q(description__icontains=query))

        results = {
            'articles': ArticleSerializer(articles, many=True).data,
            'meditations': MeditationSerializer(meditations, many=True).data,
        }

        return Response(results, status=status.HTTP_200_OK)
