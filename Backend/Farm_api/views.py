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
