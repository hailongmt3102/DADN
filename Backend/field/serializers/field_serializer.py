from rest_framework import serializers
from field.models import Data, Field
from farm.models import Farm
from .data_serializer import DataSerializer
from rest_framework import exceptions

class BaseFarmSerializer(serializers.ModelSerializer):

    class Meta:
        model = Farm
        fields = ['uuid', 'name']


class DataBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = [
            'ground_humidity',
            'air_humidity',
            'air_temperature',
            'updated_at',
            'created_at',
            ]


class FieldSerializer(serializers.ModelSerializer):

    class Meta:
        model = Field
        fields = ['uuid','created_at','farm','updated_at','location_index','length','width']
        read_only_fields = ['id', 'uuid']

    def to_internal_value(self, data):
        return super().to_internal_value(data)

    def to_representation(self, instance:Field):
        data =  super().to_representation(instance)
        data['farm'] = BaseFarmSerializer(instance.farm).data
        print(instance.latest_data())
        data['latest_data'] = DataSerializer(instance.latest_data()).data
        return data
