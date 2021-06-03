from Api.models import IODevice
from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.request import Request
from .serializers import *
from Api.Sensor_data_api.serializers import DataSerializer
# Create your views here.


def CustomSerializerFiledApi(_serializer_class):

    class FieldApi(APIView):
        permission_classes = [permissions.IsAuthenticated]
        serializer_class = _serializer_class

        def get(self, request, *args, **kargs):
            queryset = Field.objects.filter(
                field_farm=request.user.user_farm.id,
                id=kargs["field_id"]
            ).first()
            datas = self.serializer_class(queryset).data if queryset else {}
            return Response(datas, status.HTTP_200_OK)

    return FieldApi


class FieldCollectData(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kargs):
        try:
            _field: Field = Field.objects.get(
                field_farm=request.user.user_farm.id,
                id=kargs["field_id"]
            )
            _field.collect_data()
            return Response(FieldSerializer(_field).data, status.HTTP_200_OK)
        except Exception:
            return Response({"message": "Invalid field id"}, status.HTTP_404_NOT_FOUND)


class FieldToggleRelay(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request: Request, *args, **kargs):
        try:
            _field: Field = Field.objects.get(
                field_farm=request.user.user_farm.id,
                id=kargs["field_id"],
            )
            _field.toggle_relay(request.data["relay"])
            # field_relay: list[IODevice] = IODevice.objects.filter(
            #     device_field=_field.id,
            #     device_type = 2
            #     )
            # for device in field_relay:
            #     device.push_data(1 if request.data["relay"] else 0)
            # _field.collect_data()
            return Response(FieldSerializer(_field).data, status.HTTP_200_OK)
        except Exception as fail:
            print(fail)
            return Response({"message": "Invalid field id"}, status.HTTP_404_NOT_FOUND)
