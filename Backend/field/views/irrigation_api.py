from field.filters.irrigation_filter import IrrigationFilter
from field.permissions.crop_permissions import is_crop_related
from field.serializers import IrrigationSerializer
from field.permissions.irrigation_permissions import is_irrigation_related
from farm.permissions.farm_permissions import is_farm_related
from rest_framework import permissions
from rest_framework.request import Request
from field.models import Crop, Field, Irrigation
from rest_framework.decorators import api_view, permission_classes
from field.permissions import is_field_related
from field.serializers import FieldSerializer
from rest_framework.exceptions import PermissionDenied
from core.utils import response_gen
from farm.models import Farm
from rest_framework import exceptions


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def irrigation_get(request, *args,**kwargs):
    uuid = request.query_params.get('uuid')
    
    irrigation = Irrigation.objects.get(uuid = uuid)

    if not is_irrigation_related(request.user, irrigation): raise exceptions.PermissionDenied()
    data = IrrigationSerializer(irrigation).data

    return response_gen(data=data)



@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def irrigation_matrix(request, *args, **kwargs):
    field_uuid = request.data.get('field_uuid', None)
    field = Field.objects.filter(uuid = field_uuid).first()
    crop_uuid = request.data.get('crop_uuid', None)
    crop = Crop.objects.filter(uuid = crop_uuid).first()

    if field and not is_field_related(request.user, field): raise exceptions.PermissionDenied()
    if crop and not is_crop_related(request.user, crop): raise exceptions.PermissionDenied()
    data = {
        'crop':crop,
        'field':field,
    }
    
    qs = IrrigationFilter(data = data,queryset=Irrigation.objects.all()).qs
    qs = qs.order_by('-created_at')

    data = IrrigationSerializer(qs, many = True).data

    return response_gen(data)

