from re import search
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


class CropCreateView(APIView):
    def post(self, request, *args, **kargs):
        try:
            data = request.data
            field_id = data["field_id"]
            production_id = data["production_id"]
            field: Field = Field.objects.get(id=field_id)
            if not field:
                raise Exception("field dont exist")
            if field.get_active_crop():
                raise Exception("field already has a crop")
            serializer = CropCreateSerailizer(
                data={"crop_field": field_id, "crop_production": production_id})
            serializer.is_valid()
            return Response({"crop_id": serializer.save().id}, status.HTTP_201_CREATED)
        except Exception as err:
            print(err)
            return Response(
                {
                    "detail": "Fail to create crop",
                    "messages": str(err)
                }, status.HTTP_403_FORBIDDEN
            )
