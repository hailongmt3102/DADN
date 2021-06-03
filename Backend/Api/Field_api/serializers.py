from Api.models import Field, Crop
from rest_framework import serializers
from Api.Crop_api.serializers import CropSerializers, CropProductionBriefSerializer
from Api.Sensor_data_api.serializers import DataBriefSerailizer

class FieldCropsSerializer(serializers.ModelSerializer):
    crops_of_field = CropProductionBriefSerializer(many=True)
    class Meta:
        model = Field
        fields = [
            "crops_of_field"
        ]

class FieldSerializer(serializers.BaseSerializer):
    def to_representation(self, instance:Field):
        data = instance.latest_data()
        return {
            "id": instance.id,
            "field_location_index":instance.field_location_index,
            "area_length":instance.area_length,
            "area_width":instance.area_width,
            "field_create_at":instance.field_create_at,
            "data": DataBriefSerailizer(data).data if data else Noneid
        }

class FieldLatestCropSerializer(serializers.BaseSerializer):
    def to_representation(self, instance):
        crop = Crop.objects.filter(
            crop_field=instance.id).order_by('-id').first()
        return {
            "id": instance.id,
            "crops_of_field": CropSerializers(crop).data if crop else {}
        }

    # def create(self, validated_data):
    #     return HighScore.objects.create(**validated_data)
