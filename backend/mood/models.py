#/mood/models.py

from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class MoodEntry(models.Model):
    MOOD_CHOICES = [
        ('happy', 'Щасливий'),
        ('smile', 'Усміхнений'),
        ('neutral', 'Нейтральний'),
        ('sad', 'Сумний'),
        ('cry', 'Плаче'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mood_entries')
    date = models.DateField()
    mood = models.CharField(max_length=10, choices=MOOD_CHOICES)
    comment = models.TextField(blank=True)
    good_things = models.TextField(blank=True)
    bad_things = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'date')
        ordering = ['-date']

    def __str__(self):
        return f"{self.user.email} — {self.date} — {self.mood}"
