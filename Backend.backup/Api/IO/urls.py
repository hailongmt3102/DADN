from django.urls import path
from .views import *
from .serializers import *

feed_view_set = FeedViewSet.as_view({
    "get": "retrieve",
    "delete": "remove",
    "put": "update",
})

urlpatterns = [
    # path("",ProductionListApi.as_view()),
    path("field/<int:field_id>/", DeviceList.as_view()),
    path("create/", DeviceList.as_view()),
    path("feed/", FeedListView.as_view()),
    path("feed/<int:feed_id>/", feed_view_set),
    path("feed/create/", FeedViewSet.as_view({"post": "create"}))
]
