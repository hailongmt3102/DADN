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
    def to_representation(self, instance: Field):
        data = instance.latest_data()
        serialized_data = dict(DataBriefSerailizer(data).data)
        res = {
            "id": instance.id,
            "field_location_index": instance.field_location_index,
            "area_length": instance.area_length,
            "area_width": instance.area_width,
            "field_create_at": instance.field_create_at,
        }
        if data:
            res = {**res, **serialized_data}
        return res


class FieldLatestCropSerializer(serializers.BaseSerializer):
    def to_representation(self, instance):
        crop = Crop.objects.filter(
            crop_field=instance.id).order_by('-id').first()
        crop_data = CropSerializers(crop).data if crop else {}
        resp =  {
            "field_id": instance.id,
            **crop_data
        }
        print(resp)
        return resp

    # def create(self, validated_data):
    #     return HighScore.objects.create(**validated_data)
