from rest_framework import serializers
from .models import Production
from utils.serializers import ImageSerializer

class ProductionSerializer(serializers.ModelSerializer):
    image = ImageSerializer()

    class Meta:
        model = Production
        fields = [
            'uuid',
            'name',
            'image',
            'period',
            'temp_lower_bound',
            'temp_upper_bound',
            'soil_humid_lower_bound',
            'soil_humid_upper_bound',
        ]


class ProductionBaseSerializer(serializers.ModelSerializer):
    image = ImageSerializer()

    class Meta:
        model = Production
        fields = [
            'uuid',
            'name',
            'image',
        ]