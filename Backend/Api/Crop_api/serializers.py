from .models import *
from rest_framework import serializers
from Api.models import Crop, Production
from Api.Production_api.serializers import ProductionSerializer


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


class CropProductionSerializer(serializers.ModelSerializer):
    crop_production = ProductionSerializer(many=False)

    class Meta:
        model = Crop
        fields = [
            "id",
            # "is_harvested",
            "crop_state",
            "crop_production",
        ]


class CropProductionBriefSerializer(serializers.ModelSerializer):
    class _ProductionSerializer(serializers.ModelSerializer):
        class Meta:
            model = Production
            fields = [
                "id","production_image","production_name"
            ]
    crop_production = _ProductionSerializer(many=False)

    class Meta:
        model = Crop
        fields = [
            "id",
            "crop_production",
        ]
