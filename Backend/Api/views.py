from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from .models import *

from .serializers import *


class FarmApi(APIView):
    permission_classes = [permissions.IsAuthenticated]

    serializer_class = FarmFieldSerializer

    def get(self, request, *args, **kargs):
        queryset = Farm.objects.all()
        datas = list(map(
            lambda x:
            self.serializer_class(x).data,
            queryset
        ))
        return Response(datas, status.HTTP_200_OK)
