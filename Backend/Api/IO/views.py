from rest_framework import generics, status
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from Api.models import IODevice
from Auth.permissions import is_admin
from rest_framework.response import Response
from .serializers import *


class DeviceList(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kargs):
        try:
            field = Field.objects.filter(
                id=kargs["field_id"]
            ).first()
            print(field)
            data = DeviceOfFieldSerializer(field).data
            return Response(data, status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"message": "invalid request"}, status.HTTP_404_NOT_FOUND)
