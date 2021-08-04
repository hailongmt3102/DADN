from django.conf import settings
from rest_framework import serializers

class ImageSerializer(serializers.Field):
    def to_representation(self, value):
        # We pass the object instance onto `to_representation`,
        # not just the field attribute.
        return settings.BASE_URL + value.url