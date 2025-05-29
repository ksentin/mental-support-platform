from django.db import models

class Meditation(models.Model):
    TYPE_CHOICES = [
        ('breathing', 'Breathing'),
        ('relaxation', 'Relaxation'),
        ('mindfulness', 'Mindfulness'),
        ('sleep', 'Sleep'),
    ]

    ANIMATION_CHOICES = [
        ('circle', 'Circle'),
        ('bar', 'Bar'),
        ('square', 'Square'),
        ('wave', 'Wave'),
    ]

    title = models.CharField(max_length=100)
    description = models.TextField()
    youtube_url = models.URLField(blank=True, null=True)
    image = models.ImageField(upload_to='meditation_images/', blank=True, null=True)
    duration = models.PositiveIntegerField(help_text="Тривалість у секундах")
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    # поля для дихальних практик
    breathing_pattern = models.JSONField(
        blank=True,
        null=True,
        help_text='Патерн дихання у форматі {"inhale": 4, "hold": 7, "exhale": 8}'
    )
    instruction = models.TextField(blank=True, null=True, help_text='Покрокова інструкція до виконання практики')
    animation_type = models.CharField(
        max_length=20,
        choices=ANIMATION_CHOICES,
        blank=True,
        null=True,
        help_text='Тип анімації (наприклад, circle, bar)'
    )

    def __str__(self):
        return self.title
