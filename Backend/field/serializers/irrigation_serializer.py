from rest_framework import serializers
from field.models import Irrigation

class IrrigationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Irrigation
        exclude = ['field','id','crop']
        