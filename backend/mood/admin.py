from django.contrib import admin
from .models import MoodEntry

@admin.register(MoodEntry)
class MoodEntryAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'mood', 'created_at')
    list_filter = ('mood', 'date')
    search_fields = ('user__username', 'comment', 'positive_notes', 'negative_notes')
