from .models import *
from rest_framework import serializers



# class FarmSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Farm
#         fields = [
#             "id",
#             "farm_name",
#             "farm_image"
#         ]

# class FieldSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Field
#         fields = [
#             "id",
#             "field_location_index",
#             "area_length",
#             "area_width",
#         ]

# class FarmFieldSerializer(serializers.ModelSerializer):
#     fields_of_farm = FieldSerializer(many= True)


#     class Meta:
#         model = Farm
#         fields = [
#             "id",
#             "farm_name",
#             "fields_of_farm",
#         ]