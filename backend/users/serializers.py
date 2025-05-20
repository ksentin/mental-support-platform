#users/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class RegisterSerializer(serializers.ModelSerializer):
    name = serializers.CharField(write_only=True)
    age = serializers.IntegerField(write_only=True)
    gender = serializers.ChoiceField(choices=Profile.GENDER_CHOICES, write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'name', 'age', 'gender')

    def create(self, validated_data):
        name = validated_data.pop('name')
        age = validated_data.pop('age')
        gender = validated_data.pop('gender')

        # створення користувача
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        print(f"User created: {user.username}")

        # створення або оновлення профілю
        profile, created = Profile.objects.update_or_create(user=user, defaults={
            'name': name,
            'age': age,
            'gender': gender
        })
        print(f"Profile created: {created}")
        return user



