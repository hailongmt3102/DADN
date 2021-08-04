from rest_framework import serializers
from field.models import Sensor, Field
from farm.models import Feed
from .field_serializer import FieldSerializer

class SensorSerilizer(serializers.ModelSerializer):

    class Meta:
        model = Sensor
        fields = [
            'uuid',
            'name',
            'sensor_type',
            'is_test',
            'feed',
            'field'
        ]
        read_only_fields = ['id', 'uuid']

    def validate_feed(self,value):
        print('hello')
        return value

    def to_internal_value(self, data):
        self.field = FieldSerializer()
        return super().to_internal_value(data)
