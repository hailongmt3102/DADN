from Api.models import Production
from rest_framework import serializers




class ProductionSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Production
        fields = [
            "id",
            "production_name",
            "production_image",
            "production_period",
        ]
