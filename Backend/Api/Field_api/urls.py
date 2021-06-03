from django.urls import path, include
from .views import CustomSerializerFiledApi
from .serializers import FieldSerializer, FieldLatestCropSerializer, FieldCropsSerializer

urlpatterns = [
    path('<int:field_id>/', CustomSerializerFiledApi(
        FieldSerializer).as_view()),
    path("<int:field_id>/crops/",
         CustomSerializerFiledApi(FieldCropsSerializer).as_view()),
    path("<int:field_id>/crop/",
         CustomSerializerFiledApi(FieldLatestCropSerializer).as_view()),
]
