#/mood/serializers.py
from rest_framework import serializers
from .models import MoodEntry

class MoodEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodEntry
        fields = ['id', 'user', 'date', 'mood', 'comment', 'good_things', 'bad_things', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']
