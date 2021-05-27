from django.urls import path
from .views import *
from .serializers import *

urlpatterns = [
    path("crop/<int:crop_id>/", HistoryListApi.as_view()),
    path("field/<int:field_id>/", HistoryListApi.as_view()),
    path("<int:data_id>/", HistoryApi.as_view()),
]
