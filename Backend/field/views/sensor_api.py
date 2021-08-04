from field.permissions.field_permissions import is_field_related
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions, exceptions
from field.models import Field, Sensor
from field.permissions import is_field_related, is_sensor_related
from utils.views import response_gen
from field.serializers import SensorSerilizer
from farm.models import Feed

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def sensor_get(request, *args,**kargs):
    sensor_uuid = request.query_params.get('uuid')
    sensor = Sensor.objects.get(uuid = sensor_uuid)

    if not is_sensor_related(request.user, sensor): raise exceptions.PermissionDenied()

    data = SensorSerilizer(sensor).data

    return response_gen(data=data)



@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def sensor_matrix(request, *args, **kargs):
    field_uuid = request.data.get('field_uuid', None)
    field = Field.objects.get(uuid = field_uuid)

    if not is_field_related(request.user, field): raise exceptions.PermissionDenied()

    sensors = field.sensor_field.all().order_by('-created_at')
    data = SensorSerilizer(sensors, many = True).data

    return response_gen(data)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def sensor_create(request, *args, **kargs):
    data = request.data
    
    data['field'] = Field.objects.get(uuid=data.get('field',None))
    data['feed'] = Feed.objects.get(uuid=data.get('feed',None))
    
    if not is_field_related(request.user, data['field']): raise exceptions.PermissionDenied()
    sensor = Sensor.objects.create(**data)
    
    return response_gen(SensorSerilizer(sensor).data)

