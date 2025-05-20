# articles/models.py
from django.db import models
from django_ckeditor_5.fields import CKEditor5Field

class Article(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    content = CKEditor5Field('Текст', config_name='extends')
    url = models.URLField()
    image = models.ImageField(upload_to='articles/', blank=True, null=True)
    topic = models.CharField(max_length=100)
    source = models.CharField(max_length=255)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
