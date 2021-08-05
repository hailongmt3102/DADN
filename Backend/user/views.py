from rest_framework.decorators import api_view, permission_classes
from user.permissions import UserPermissions
from core.utils import response_gen
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated
)
from rest_framework import (
    status,
    generics,
    viewsets
)
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .models import (
    User,
    UserProfile
)
from .serializers import MyTokenObtainPairSerializer, UserProfileSerializer, UserSerializer


class UserCreate(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        ...


class BlacklistTokenUpdateView(viewsets.ViewSet):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def log_out(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return response_gen(status=status.HTTP_205_RESET_CONTENT)
        except Exception as err:
            return response_gen(status=status.HTTP_400_BAD_REQUEST)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        resp = super().post(request, *args, **kwargs)
        return response_gen(data=resp.data, status=resp.status_code)


class MyTokenRefrseshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        raise Exception("hello")
        resp = super().post(request, *args, **kwargs)
        return response_gen(data=resp.data, status=resp.status_code)


class UserView(viewsets.ViewSet):
    permission_classes = [UserPermissions]
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kargs):
        return response_gen(data=self.serializer_class(request.user).data)

    def update(self, request, *args, **kargs):
        serializer = self.serializer_class()
        user = serializer.update(
            request.user, validated_data=request.data
        )
        return response_gen(data=self.serializer_class(user).data)

    def delete(self, request, *args, **kargs):
        request.user.delete()
        return response_gen()

    def create(self, request, *args, **kargs):
        user = User.objects.create_user(**request.data)
        return response_gen(data=self.serializer_class(user).data)


class UserProfileView(viewsets.ViewSet):
    serializer_class = UserProfileSerializer
    permission_classes = [UserPermissions]

    def retrieve(self, request, *args, **kargs):
        return response_gen(data=self.serializer_class(request.user).data)

    def update(self, request, *args, **kargs):
        data = request.data.dict()
        print(data)
        if data.get("id"):
            data.pop("id")
        if data.get("uuid"):
            data.pop("id")

        profile = request.user.profile
        serializer = self.serializer_class(instance=profile, data=data)
        if serializer.is_valid():
            serializer.save()
        else:
            return response_gen(message=str(serializer.errors), status=status.HTTP_406_NOT_ACCEPTABLE)
        return response_gen(data=serializer.data)


class MyTokenRefressView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        data = super().post(request, *args, **kwargs).data
        return response_gen(data=data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_access_token(request, *args,**kargs):
    return response_gen()
