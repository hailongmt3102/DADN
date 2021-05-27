from re import search
from Api.models import Farm, Field
from rest_framework import serializers
from Field_api.serializers import FieldLatestCropSerializer



class FarmFieldsCropSerializer(serializers.ModelSerializer):
    fields_of_farm = FieldLatestCropSerializer(many = True)
    class Meta:
        model = Farm
        fields = [
            "id",
            "farm_name",
            "fields_of_farm"
        ]

class FarmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farm
        fields = [
            "id",
            "farm_name",
            "farm_create_at",
            "farm_image"
        ]