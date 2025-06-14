#users/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import ValidationError

class RegisterSerializer(serializers.ModelSerializer):
    name = serializers.CharField(write_only=True)
    age = serializers.IntegerField(write_only=True)
    gender = serializers.ChoiceField(choices=Profile.GENDER_CHOICES, write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'name', 'age', 'gender')

    def validate_password(self, value):
        try:
            validate_password(value)
        except Exception as e:
            raise serializers.ValidationError(e.messages)
        return value

    def create(self, validated_data):
        name = validated_data.pop('name')
        age = validated_data.pop('age')
        gender = validated_data.pop('gender')

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )

        Profile.objects.update_or_create(user=user, defaults={
            'name': name,
            'age': age,
            'gender': gender
        })
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email')
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Profile
        fields = ['username', 'email', 'name', 'age', 'gender']

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        email = user_data.get('email')

        if email:
            instance.user.email = email
            instance.user.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance
