from rest_framework import serializers
from django.contrib.auth.models import User
from .models import MyUser, Appointment

class MyUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['profile_image']



class MyUserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = MyUser
        fields=['username', 'email', 'first_name', 'last_name', 'password']

    def create(self, validated_data):
        user = MyUser(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['title', 'description', 'date', 'user']