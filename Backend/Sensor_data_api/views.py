from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from Api.models import SensorData, Field, IOdevice
from Auth.permissions import is_admin, is_owner
from .serializers import DataListItemSerializer, DataSerializer
from rest_framework.response import Response
# Create your views here.
import json


class DataCollectApi(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kargs):
        field = Field.objects.get(id=kargs["field_id"])
        if not field:
            return Response(None, status.HTTP_404_NOT_FOUND)
        io_device = IOdevice.objects.filter(device_field=field.id).all()
        data = {}
        for device in io_device:
            if not device.output:
                temp = device.collect()
                print(temp)
                print(device.feed_name)
                print(device.feed_name == "bk-iot-soil")
                if device.feed_name == "bk-iot-soil":
                    data["data_ground_id"] = temp.id
                    data["ground_humidity"] = json.loads(temp.value)["data"]
                    
                else:
                    value = json.loads(temp.value).data
                    data["data_air_id"] = temp.id
                    data["air_humidity"] = value
                    data["air_temperature"] = value
        print(data)
        return Response(data, status.HTTP_200_OK)


class DataListApi(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated, is_admin]
    serializer_class = DataListItemSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        query_set = SensorData.objects.all().order_by("-id")
        field = self.kwargs.get('field_id')
        crop = self.kwargs.get('crop_id')
        if field:
            query_set = list(
                filter(lambda x: x.data_field.id == field, query_set))
        if crop:
            query_set = list(
                filter(lambda x: x.data_crop.id == crop, query_set))

        return query_set


class DataApi(APIView):
    permission_classes = [IsAuthenticated, is_admin]
    serializer_class = DataSerializer

    def get(self, request, *args, **kargs):
        queryset = SensorData.objects.filter(
            id=kargs.get("data_id"),
        ).first()
        if not queryset:
            return Response(None, status.HTTP_404_NOT_FOUND)
        datas = self.serializer_class(queryset).data if queryset else {}
        return Response(datas, status.HTTP_200_OK)
