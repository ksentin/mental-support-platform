# admin.py
from django.contrib import admin
from .models import Meditation

@admin.register(Meditation)
class MeditationAdmin(admin.ModelAdmin):
    list_display = ('title', 'type', 'duration', 'created_at')
    list_filter = ('type', 'created_at', 'animation_type')
    search_fields = ('title', 'description', 'instruction')
    readonly_fields = ('created_at',)
    
    fieldsets = (
        ('Основна інформація', {
            'fields': ('title', 'description', 'type', 'duration', 'created_at')
        }),
        ('Медіа', {
            'fields': ('youtube_url', 'image')
        }),
        ('Для дихальних практик', {
            'fields': ('breathing_pattern', 'instruction', 'animation_type')
        }),
    )
