from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from Api.models import WateringHistory
from Auth.permissions import is_admin, is_owner
from .serializers import *
from rest_framework.response import Response
# Create your views here.


class HistoryListApi(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated, is_admin]
    serializer_class = HistoryListItemSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        query_set = WateringHistory.objects.all().order_by("-id")
        field = self.kwargs.get('field_id')
        crop = self.kwargs.get('crop_id')
        if field:
            query_set = list(
                filter(lambda x: x.Watering_field.id == field, query_set))
        if crop:
            query_set = list(
                filter(lambda x: x.watering_crop.id == crop, query_set))

        return query_set


class HistoryApi(APIView):
    permission_classes = [IsAuthenticated, is_admin]
    serializer_class = HistorySerializer

    def get(self, request, *args, **kargs):
        queryset = WateringHistory.objects.filter(
            id=kargs.get("data_id"),
        ).first()
        if not queryset:
            return Response(None, status.HTTP_404_NOT_FOUND)
        datas = self.serializer_class(queryset).data if queryset else {}
        return Response(datas, status.HTTP_200_OK)
