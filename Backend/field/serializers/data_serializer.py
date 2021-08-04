from rest_framework import serializers
from field.models import Data

class DataSerializer(serializers.ModelSerializer):

    class Meta:
        model = Data
        fields = [
            'uuid',
            'ground_humidity',
            'air_humidity',
            'air_temperature',
            'relay',
            'updated_at',
            'created_at',
        ]

    