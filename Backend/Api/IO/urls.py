from django.urls import path
from .views import *
from .serializers import *
urlpatterns = [
    # path("",ProductionListApi.as_view()),
    path("field/<int:field_id>/",DeviceList.as_view()),
]
