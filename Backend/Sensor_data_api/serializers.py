from re import search
from Api.models import WateringHistory, Crop, Production, SensorData
from rest_framework import serializers


class DataSerializer(serializers.ModelSerializer):
    class CropSerializer(serializers.ModelSerializer):
        class ProductionSerializer(serializers.ModelSerializer):
            class Meta:
                model = Production
                fields = [
                    "id",
                    "production_name"
                ]
        crop_production = ProductionSerializer()

        class Meta:
            model = Crop
            fields = [
                "id",
                "crop_production",
            ]
    data_crop = CropSerializer()
    data_field = serializers.StringRelatedField()

    class Meta:
        model = SensorData
        fields = [
            "id",
            "ground_humidity",
            "air_humidity",
            "air_temperature",
            "record_time",
            "data_crop",
            "data_field",
            "data_from_air_sensor",
            "data_from_fround_sensor",
        ]


class DataListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorData
        fields = [
            "id",
            "record_time",
        ]
