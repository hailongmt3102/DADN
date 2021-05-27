from Api.models import Field, Crop
from rest_framework import serializers
from Crop_api.serializers import CropSerializers


class FieldCropsSerializer(serializers.ModelSerializer):
    crops_of_field = CropSerializers(many=True)
    class Meta:
        model = Field
        fields = [
            "crops_of_field"
        ]

class FieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = Field
        fields = [
            "id",
            "field_location_index",
            "area_length",
            "area_width",
            "field_create_at",
        ]


class FieldLatestCropSerializer(serializers.BaseSerializer):
    # def to_internal_value(self, data):
    #     score = data.get('score')
    #     player_name = data.get('player_name')

    #     # Perform the data validation.
    #     if not score:
    #         raise serializers.ValidationError({
    #             'score': 'This field is required.'
    #         })
    #     if not player_name:
    #         raise serializers.ValidationError({
    #             'player_name': 'This field is required.'
    #         })
    #     if len(player_name) > 10:
    #         raise serializers.ValidationError({
    #             'player_name': 'May not be more than 10 characters.'
    #         })

    #     # Return the validated values. This will be available as
    #     # the `.validated_data` property.
    #     return {
    #         'score': int(score),
    #         'player_name': player_name
    #     }

    def to_representation(self, instance):
        crop = Crop.objects.filter(
            crop_field=instance.id).order_by('-id').first()
        return {
            "id": instance.id,
            "field_location_index": instance.field_location_index,
            "area_length": instance.area_length,
            "area_width": instance.area_width,
            "field_create_at": instance.field_create_at,
            "crops_of_field": CropSerializers(crop).data if crop else {}
        }

    # def create(self, validated_data):
    #     return HighScore.objects.create(**validated_data)
