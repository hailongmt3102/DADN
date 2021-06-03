from django.urls import path
from .views import *
from .serializers import *
urlpatterns = [
    path("",ProductionListApi.as_view()),
    path("<int:production_id>/",ProductionApi.as_view()),
]
