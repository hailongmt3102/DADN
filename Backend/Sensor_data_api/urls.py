from django.urls import path
from .views import *
from .serializers import *

urlpatterns = [
    path("crop/<int:crop_id>/", DataListApi.as_view()),
    path("field/<int:field_id>/", DataListApi.as_view()),
    path("<int:data_id>/", DataApi.as_view()),
]
