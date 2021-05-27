from django.shortcuts import render

# Create your views here.
from Crop_api.serializers import CropBaseSerializers
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from .models import *
from .serializers import *
from Auth.models import MyUser
from Api.models import Field
from functools import reduce

class CropsBaseView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CropBaseSerializers

    def get(self, request, *args, **kargs):
        print(request.user.user_first_name)
        fields = Field.objects.filter(field_farm=request.user.user_farm)
        query_set = reduce(
            lambda crops,field :crops + [Crop.objects.filter(crop_field = field.id).last()],
            fields,
            []
            
        )
        print(query_set)
        # print(query_set[0].crop_start_date)
        datas = list(
            map(
            lambda x:
            self.serializer_class(x).data,
            query_set
        )
        )
        return Response(datas, status.HTTP_200_OK)


class FarmCropsBaseView(APIView):
    pass
