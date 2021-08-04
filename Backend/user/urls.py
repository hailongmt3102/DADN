from django.urls import path, include
from .views import UserProfileView, UserView


from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import BlacklistTokenUpdateView, MyTokenObtainPairView, UserView


auth_urls = [
    path('', include('rest_framework.urls', namespace='rest_framework')),
    path('/sign_in', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('/sign-out', BlacklistTokenUpdateView.as_view({"post": "log_out"}),
         name='blacklist')
]

user_profile_urls = [
    path("", UserProfileView.as_view({"get":"retrive"})),
    path("/update", UserProfileView.as_view({"post":"update"})),
]

urlpatterns = [
    path("/create", UserView.as_view({"post": "create"}), name = 'create_user'),
    path("/auth", include(auth_urls)),
    path("", UserView.as_view({"get": "retrieve"})),
    path("/profile",include(user_profile_urls)),
]
