from django.urls import path, include
from .views import CustomSerializerFiledApi, FieldCollectData, FieldToggleRelay
from .serializers import FieldSerializer, FieldLatestCropSerializer, FieldCropsSerializer

urlpatterns = [
    path('<int:field_id>/', CustomSerializerFiledApi(
        FieldSerializer).as_view()),
    path("<int:field_id>/crops/",
         CustomSerializerFiledApi(FieldCropsSerializer).as_view()),
    path("<int:field_id>/crop/",
         CustomSerializerFiledApi(FieldLatestCropSerializer).as_view()),
    path("<int:field_id>/collect/", FieldCollectData.as_view()),
    path("<int:field_id>/toggle/", FieldToggleRelay.as_view()),
]
