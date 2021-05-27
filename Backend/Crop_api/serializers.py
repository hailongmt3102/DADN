from .models import *
from rest_framework import serializers
from Api.models import Crop
from Production_api.serializers import ProductionSerializer

class CropSerializers(serializers.ModelSerializer):
    crop_production = ProductionSerializer(many=False)
    class Meta:
        model = Crop
        fields = [
            "id",
            "crop_start_date",
            "crop_harvest_date",
            "crop_state",
            "crop_production",
        ]

class  CropProductionSerializer(serializers.ModelSerializer):
    crop_production = ProductionSerializer(many = False)
    class Meta:
        model = Crop
        fields = [
            "id",
            "is_harvested",
            "crop_state",
            "crop_production",
        ]


