# articles/admin.py

from django.contrib import admin
from .models import Article

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'topic', 'source', 'added_at')
    search_fields = ('title', 'topic', 'source')
