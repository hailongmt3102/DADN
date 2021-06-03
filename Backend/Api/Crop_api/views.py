from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from .models import *
from .serializers import *
from Auth.models import MyUser
from Api.models import Field, Crop
from functools import reduce


class CropsBaseView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CropSerializers

    def get(self, request, *args, **kargs):
        # crop = Crop.objects.filter(id=kargs["crop_id"]).first()
        try:
            crop = Crop.objects.get(id=kargs["crop_id"])
        except Exception:
            return Response({"message": "crop not found"}, status.HTTP_404_NOT_FOUND)
        return Response(self.serializer_class(crop).data, status.HTTP_200_OK)


class FarmCropsBaseView(APIView):
    pass
