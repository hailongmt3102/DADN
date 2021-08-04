from user.models import User, UserProfile
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # token['email'] = user.username
        return token


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields =[
            "first_name",
            "last_name",
            "address",
            ]

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only = True)
    # created_at = UserProfileSerializer()
    class Meta:
        model = User
        fields = [
            "email",
            "username",
            "profile"
            ]

