from field.filters.data_filter import DataFilter
from field.permissions.crop_permissions import is_crop_related
from field.permissions import is_data_related
from field.permissions.field_permissions import is_field_related
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions, exceptions
from field.models import Crop, Field, Sensor, Data
from field.permissions import is_field_related
from utils.views import response_gen
from field.serializers import DataSerializer
from farm.models import Feed

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def data_get(request, *args,**kargs):
    data_uuid = request.query_params.get('uuid')
    print(data_uuid)
    data = Data.objects.get(uuid = data_uuid)

    if not is_data_related(request.user, data): raise exceptions.PermissionDenied()
    data = DataSerializer(data).data
    return response_gen(data=data)



@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def data_matrix(request, *args, **kargs):
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
    
    qs = DataFilter(data = data,queryset=Data.objects.all()).qs
    qs = qs.order_by('-created_at')

    data = DataSerializer(qs, many = True).data
    return response_gen(data)
