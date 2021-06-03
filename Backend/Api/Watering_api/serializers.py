from re import search
from Api.models import WateringHistory, Crop, Production, SensorData
from rest_framework import serializers


class HistorySerializer(serializers.ModelSerializer):
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
    watering_crop = CropSerializer()
    Watering_field = serializers.StringRelatedField()

    class Meta:
        model = WateringHistory
        fields = [
            "id",
            "water_amount",
            "watering_start_time",
            "watering_end_time",
            "watering_crop",
            "Watering_field",
        ]


class HistoryListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = WateringHistory
        fields = [
            "id",
            "watering_start_time",
        ]
