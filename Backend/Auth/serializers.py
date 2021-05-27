from rest_framework import serializers
from .models import MyUser
from Api.models import Farm

class UserCreateSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = MyUser
        fields = ('email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        new_farm = Farm()
        new_farm.save()
        instance.user_farm = new_farm
        instance.save()
        return instance

class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        
