from core.enums import UserRole
from rest_framework import serializers, views, viewsets, generics, permissions
from django.urls import resolve
from .models import Farm, Feed, UserFarm
from .serializers import FarmCreateSerializer, FarmSerializer, FeedSerializer
from core.utils import response_gen
from rest_framework import status
from rest_framework import parsers


class FarmView(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [
        parsers.MultiPartParser,
        parsers.FormParser,
        parsers.JSONParser,
    ]

    def get_object(self):
        request = self.request
        farm_uuid = request.data.get('uuid')
        print(farm_uuid)
        print(self.request.data)
        try:
            object = Farm.objects.get(uuid=farm_uuid)
            return object
        except Exception as exc:
            return None

    def check_object_permissions(self, request, obj):
        return super().check_object_permissions(request, obj)

    def get_object_or_404(self):
        object = self.get_object()
        if not object:
            raise Exception("farm not found")
        return object

    def get_queryset(self):
        data = self.request.data
        farms_typ:str = data.pop('type','OWNER')
        qs = Farm.objects.filter(
            user_farm_farm__user=self.request.user.profile.uuid,
            user_farm_farm__role= farms_typ.upper(),
        )
        return qs

    def read(self, request, *args, **kargs):
        url_name = resolve(request.path_info).url_name
        if url_name == 'read_farm':
            many = False
            query_set = self.get_object_or_404()
        elif url_name == 'matrix_farm':
            many = True
            query_set = self.get_queryset()
        return response_gen(data=FarmSerializer(query_set, many=many).data)

    def create(self, request, *args, **kargs):
        
        serializer = FarmCreateSerializer(data=request.data, context={
                                    'exclude': ['created_at']})
        if serializer.is_valid():
            farm = serializer.save()
            user_farm = UserFarm(
                farm=farm, user=request.user.profile, role=UserRole.OWNER)
            user_farm.save()
            return response_gen(data=FarmSerializer(farm).data, message="success")
        else:
            return response_gen(errorCode=status.HTTP_400_BAD_REQUEST, message='invalid data')


class FeedView(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FeedSerializer



    def get(self, request, *args, **kargs):
        uuid = request.query_params.get('uuid', None)
        feed = Feed.objects.get(uuid = uuid)
        return response_gen(data = FeedSerializer(feed).data)

    def list(self, request, *args, **kargs):
        farm_uuid = request.data.pop('farm_uuid')
        feeds = Feed.objects.filter(farm__uuid = farm_uuid)
        return response_gen(data = FeedSerializer(feeds,many = True).data)

    def create(self, request, *args, **kargs):
        serializer = FeedSerializer(data=request.data)
        if serializer.is_valid():
            feed = serializer.save()
            return response_gen(data=FeedSerializer(feed).data, message="success")
        else:
            return response_gen(errorCode=status.HTTP_400_BAD_REQUEST, message='invalid data')

    def update(self, request, *args, **kargs):
        feed_uuid = request.data.pop('uuid')
        feed = Feed.objects.get(uuid= feed_uuid)
        serializer = FeedSerializer(feed, request.data)
        if serializer.is_valid():
            serializer.save()
            return response_gen(data= serializer.data)
        else:
            return response_gen(status=400, message='INVALID DATA')
        


