from re import search

from django.db import models
from Api.models import Farm, Field, SensorData
from rest_framework import serializers
from Api.Field_api.serializers import FieldLatestCropSerializer
from Api.Crop_api.serializers import CropProductionBriefSerializer


class FarmFieldsCropSerializer(serializers.BaseSerializer):

    class FieldSerializer(serializers.BaseSerializer):

        class DataSerializer(serializers.ModelSerializer):
            class Meta:
                model = SensorData
                fields = [
                    "is_relay_on",
                ]

        def to_representation(self, instance: Field):
            crop = instance.get_active_crop()
            data = instance.latest_data()
            return {
                "id": instance.id,
                "field_location_index": instance.field_location_index,
                "crop_of_field": CropProductionBriefSerializer(crop).data if crop else None,
                "data_of_field": self.DataSerializer(data).data if data else None
            }

    def to_representation(self, instance):
        farm_fields = Field.objects.filter(field_farm=instance.id)

        return {
            "id": instance.id,
            "farm_name": instance.farm_name,
            "fields_of_farm": list(map(
                lambda field: self.FieldSerializer(field).data,
                farm_fields
            ))
        }


# class FieldLatestCropSerializer(serializers.BaseSerializer):
#     # def to_internal_value(self, data):
#     #     score = data.get('score')
#     #     player_name = data.get('player_name')

#     #     # Perform the data validation.
#     #     if not score:
#     #         raise serializers.ValidationError({
#     #             'score': 'This field is required.'
#     #         })
#     #     if not player_name:
#     #         raise serializers.ValidationError({
#     #             'player_name': 'This field is required.'
#     #         })
#     #     if len(player_name) > 10:
#     #         raise serializers.ValidationError({
#     #             'player_name': 'May not be more than 10 characters.'
#     #         })

#     #     # Return the validated values. This will be available as
#     #     # the `.validated_data` property.
#     #     return {
#     #         'score': int(score),
#     #         'player_name': player_name
#     #     }

#     def to_representation(self, instance):
#         crop = Crop.objects.filter(
#             crop_field=instance.id).order_by('-id').first()
#         return {
#             "id": instance.id,
#             "field_location_index": instance.field_location_index,
#             "area_length": instance.area_length,
#             "area_width": instance.area_width,
#             "field_create_at": instance.field_create_at,
#             "crops_of_field": CropSerializers(crop).data if crop else {}
#         }

#     # def create(self, validated_data):
#     #     return HighScore.objects.create(**validated_data)


class FarmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farm
        fields = [
            "id",
            "farm_name",
            "farm_create_at",
            "farm_image"
        ]
