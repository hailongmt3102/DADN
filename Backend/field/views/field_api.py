from farm.permissions.farm_permissions import is_farm_related
from rest_framework import permissions
from rest_framework.request import Request
from field.models import Crop, Field
from rest_framework.decorators import api_view, permission_classes
from field.permissions import is_field_related
from field.serializers import FieldSerializer
from rest_framework.exceptions import PermissionDenied
from core.utils import response_gen
from farm.models import Farm
# Create your views here.


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def field_get(request: Request, *args, **kargs):
    uuid = request.query_params.get('uuid')
    field = Field.objects.get(uuid=uuid)
    if is_field_related(request.user, field):
        data = FieldSerializer(field).data
    else:
        raise PermissionDenied()
    return response_gen(data=data)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def fields_list(request: Request, *args, **kargs):
    farm_uuid = request.data.get('farm_uuid')
    farm = Farm.objects.get(uuid=farm_uuid)

    if not is_farm_related(request.user, farm): raise PermissionDenied()

    fields = farm.field_farm.all()
    serializer = FieldSerializer(fields, many=True)
    
    data = serializer.data
    return response_gen(data=data)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def field_create(request, *args, **kargs):
    data = request.data

    data['farm'] = Farm.objects.get(uuid=data['farm'])
    
    if not is_farm_related(request.user, data['farm']): raise PermissionDenied()
    
    serializer = FieldSerializer(data = data)

    if serializer.is_valid(raise_exception=True):
        field = serializer.save()
    
    return response_gen(FieldSerializer(field).data)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def field_toggle(request, *args, **kargs):
    try:
        data = request.data
        relay = data.get('relay')
        field:Field = Field.objects.get(uuid=data.get('uuid',None))
        farm:Farm = field.farm

        if not is_field_related(request.user, field): raise PermissionDenied()

        if farm.auto_mode:
            data = field.latest_data()
            crop:Crop = field.current_crop()
            if crop:
                suggest = crop.suggest(data)
                if not suggest ^ relay:
                    field.toggle_relay(data.get('relay'))
        else:
            field.toggle_relay(data.get('relay'))

        data =  FieldSerializer(field).data
        return response_gen(data)
    except Exception as exception:
        print(exception)
        return response_gen(data='Fail')



"""

    def update(self, request, args, **kargs):
        data = request.data

        uuid = data.pop('uuid')

        field = Field.objects.get(uuid=uuid)

        serializer: FieldSerializer = FieldSerializer(field, data)

        serializer.is_valid()

        serializer.save()

"""

