from decimal import Context
from django.db import models
from .models import Farm, Feed, UserFarm
from rest_framework import serializers
from django.conf import settings

class MyImageSerializer(serializers.Field):
    def to_representation(self, value):
        return settings.BASE_URL + value.url

    def to_internal_value(self, data):
        return super().to_internal_value(data)

class FarmSerializer(serializers.ModelSerializer):
    image = MyImageSerializer()
    class Meta:
        model = Farm
        fields = [
            "uuid",
            "name",
            "created_at",
            "image",
            'latitude',
            'longtitude',
        ]

    def check_context(self):
        context = self.context

        class new_meta:
            model = self.Meta.model

        if context.get('fields'):
            new_meta.fields = Context.get('fields')
            self.Meta = new_meta
        elif context.get('exclude'):
            new_meta.exclude = context.get('exclude')

        if 'image' in self.Meta.fields:
            print("hello")
            self.image = MyImageSerializer

    def to_representation(self, instance):
        self.check_context()
        print(self.image)
        return super().to_representation(instance)


class FarmCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farm
        fields = [
            "uuid",
            "name",
            "created_at",
            "image",
            'latitude',
            'longtitude',
        ]

class FeedSerializer (serializers.ModelSerializer):

    class Meta:
        model = Feed
        fields = [
            "uuid",
            "username",
            "key",
            "farm",
            'created_at'
        ]
        read_only_fields = ['uuid', ]

