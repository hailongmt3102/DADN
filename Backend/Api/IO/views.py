from rest_framework import generics, status
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView, exception_handler
from Api.models import IODevice, Feed
from Auth.permissions import is_admin
from rest_framework.response import Response
from .serializers import *
from rest_framework.request import Request
from rest_framework import viewsets
import logging

# Get an instance of a logger
logger = logging.getLogger("django")


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

    def post(self, request, *args, **kargs):
        try:
            serializer: CreateDeviceSerailizer = CreateDeviceSerailizer(
                data=request.data)

            serializer.is_valid()
            # logger.error(serializer.errors)
            # logger.error(serializer.data)

            return Response({"device_id": serializer.save().id}, status.HTTP_201_CREATED)
        except Exception as err:
            print(err)
            return Response(
                {
                    "detail": "Fail to create device",
                    "messages": str(err)
                }, status.HTTP_403_FORBIDDEN
            )


class FeedListView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FeedSerializer

    def get(self, request, *args, **kargs):
        try:
            farm_id = request.user.user_farm.id
            query_set: list[Feed] = Feed.objects.filter(feed_farm=farm_id)
            data = list(map(
                lambda _feed: self.serializer_class(_feed).data,
                query_set
            ))
            return Response(data, status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"message": "invalid request"}, status.HTTP_404_NOT_FOUND)


class FeedViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FeedSerializer

    def retrieve(self, request, *args, **kargs):
        try:
            feed = Feed.objects.get(id=kargs["feed_id"])
            serializer = self.serializer_class(feed)
            return Response(serializer.data, status.HTTP_200_OK)
        except Exception as err:
            print(err)
            return Response({"message": str(err)}, status.HTTP_403_FORBIDDEN)

    def update(self, request: Request, *args, **kargs):
        try:
            feed = Feed.objects.get(id=kargs["feed_id"])
            self.serializer_class().update(feed, validated_data=request.data)
            return Response({}, status.HTTP_200_OK)
        except Exception as err:
            print(err)
            return Response({"message": str(err)}, status.HTTP_403_FORBIDDEN)

    def create(self, request, *args, **kargs):
        try:
            # print(request.user.user_farm)
            data = {**(request.data), "feed_farm": request.user.user_farm.id}
            serializer = self.serializer_class(data=data)
            serializer.is_valid()
            serializer.save()
            return Response({}, status.HTTP_201_CREATED)
        except Exception as err:
            # print(err)
            return Response({"message": str(err)}, status.HTTP_403_FORBIDDEN)

    def remove(self, request, *args, **kargs):
        try:
            # print(request.user.user_farm)
            feed = Feed.objects.get(id=kargs["feed_id"])
            feed.delete()
            return Response({"message": "success"}, status.HTTP_202_ACCEPTED)
        except Exception as err:
            # print(err)
            return Response({"message": str(err)}, status.HTTP_403_FORBIDDEN)
