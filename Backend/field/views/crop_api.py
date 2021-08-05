from field.serializers import CropProductionSerialzier
from field.permissions.field_permissions import is_field_related
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions, exceptions
from field.models import Field, Crop
from field.permissions import is_field_related, is_crop_related
from utils.views import response_gen
from product.models import Production
from core.enums import CropState
import datetime
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def field_active_crop(request, *args, **kargs):
    
    field_uuid = request.query_params.get('field_uuid', None)
    field:Field = Field.objects.get(uuid = field_uuid)
    
    if not is_field_related(request.user, field): raise exceptions.PermissionDenied

    crop = field.current_crop()
    data = CropProductionSerialzier(crop).data if crop else None

    return response_gen(data = data)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def crop_get(request, *args,**kargs):
    crop_uuid = request.query_params.get('uuid')
    crop = Crop.objects.get(uuid = crop_uuid)

    if not is_crop_related(request.user, crop): raise exceptions.PermissionDenied()

    data = CropProductionSerialzier(crop).data

    return response_gen(data=data)



@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def crop_matrix(request, *args, **kargs):
    field_uuid = request.data.get('field_uuid', None)
    field = Field.objects.get(uuid = field_uuid)

    if not is_field_related(request.user, field): raise exceptions.PermissionDenied()

    crops = field.crop_field.all().order_by('-created_at')
    data = CropProductionSerialzier(crops, many = True).data

    return response_gen(data)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def crop_create(request, *args, **kargs):
    data = request.data
    
    data['field'] = Field.objects.get(uuid=data.get('field',None))
    data['production'] = Production.objects.get(uuid = data.get('production', None))
    
    if not is_field_related(request.user, data['field']): raise exceptions.PermissionDenied()
    crop = Crop.objects.create(**data)
    
    return response_gen(CropProductionSerialzier(crop).data)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def harvest_crop(request, *args, **kargs):
    crop_uuid = request.query_params.get('uuid', None)
    
    crop :Crop= Crop.objects.get(uuid=crop_uuid)
    if not is_crop_related(request.user, crop): raise exceptions.PermissionDenied()
    state = crop.state

    if state == CropState.HARVESTED:
        raise exceptions.PermissionDenied()

    crop.state = CropState.HARVESTED
    crop.harvested_at = datetime.datetime.now()
    crop.save()
    
    return response_gen(CropProductionSerialzier(crop).data)

