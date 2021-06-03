from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

from .serializers import *
# Create your views here.


def CustomSerializerFiledApi(_serializer_class):
    pass
    class FieldApi(APIView):
        permission_classes = [permissions.IsAuthenticated]
        serializer_class = _serializer_class

        def get(self, request, *args, **kargs):
            print(request.get_full_path().split('/'))
            queryset = Field.objects.filter(
                field_farm=request.user.user_farm.id,
                id =  kargs["field_id"]
            ).first()
            datas = self.serializer_class(queryset).data if queryset else {}
            return Response(datas, status.HTTP_200_OK)
    
    return FieldApi
