from django.urls import path
from .views import *
from .serializers import *
urlpatterns = [
    # path("",ProductionListApi.as_view()),
    path("field/<int:field_id>/",DeviceList.as_view()),
    path("create/",DeviceList.as_view()),
    path("feed/", FeedListView.as_view())
]
