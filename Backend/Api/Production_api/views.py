from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from Api.models import Production
from Auth.permissions import is_admin
from .serializers import ProductionSerializer
from rest_framework.response import Response
# Create your views here.


class ProductionListApi(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated, is_admin]
    queryset = Production.objects.all().order_by("-id")
    serializer_class = ProductionSerializer


class ProductionApi(APIView):
    permission_classes = [IsAuthenticated, is_admin]
    serializer_class = ProductionSerializer

    def get(self, request, *args, **kargs):
        queryset = Production.objects.filter(
            id=kargs.get("production_id"),
        ).first()
        if  not queryset:
            return Response(None, status.HTTP_404_NOT_FOUND)
        datas = self.serializer_class(queryset).data if queryset else {}
        return Response(datas, status.HTTP_200_OK)

    def put():pass
