from rest_framework import serializers
from field.models import Crop, Field
from product.serializers import ProductionBaseSerializer

class CropProductionSerialzier(serializers.ModelSerializer):
    production = ProductionBaseSerializer()
    class Meta:
        model = Crop
        fields = [
            'uuid',
            'created_at',
            'updated_at',
            'started_at',
            'harvested_at',
            'production',
            'state',
        ]



# class CropProductionSerialzier(serializers.ModelSerializer):

#     class Meta:
#         model = Crop
#         fields = []