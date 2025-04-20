#users/models.py
from django.db import models

from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    GENDER_CHOICES = [
        ('male', 'Чоловіча'),
        ('female', 'Жіноча'),
        ('other', 'Інше'),
        ('prefer_not', 'Віддаю перевагу не вказувати'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES)

    def __str__(self):
        return self.user.username
