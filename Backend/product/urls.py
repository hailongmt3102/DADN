from .views import ProductApi
from django.urls import path

urlpatterns = [
    path('/get', ProductApi.as_view({'get': 'get'})),
    path('/matrix', ProductApi.as_view({'post': 'list', 'get': 'list'})),
]
