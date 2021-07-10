from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

from .serializers import *


class FarmApi(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FarmSerializer

    def get(self, request, *args, **kargs):
        queryset = request.user.user_farm
        datas = self.serializer_class(queryset).data
        return Response(datas, status.HTTP_200_OK)

class FarmFieldsLatestCropApi(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FarmFieldsCropSerializer

    def get(self, request, *args, **kargs):
        queryset = request.user.user_farm
        datas = self.serializer_class(queryset).data
        return Response(datas, status.HTTP_200_OK)


class ToggleAutoView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FarmSerializer

    def post(self, request, *args, **kargs):
        val = kargs["auto"]
        farm = request.user.user_farm
        farm.farm_auto_mode = val
        farm.save()
        return Response(self.serializer_class(farm).data, status.HTTP_200_OK)
 

class RenewFarmInfo(APIView):
    permission_classes = [permissions.IsAuthenticated]
    # serializer_class = FarmSerializer
    def get(self, request, *args, **kargs):
        request.user.user_farm.collect_data()
        return FarmFieldsLatestCropApi().get(request, *args, **kargs)

 