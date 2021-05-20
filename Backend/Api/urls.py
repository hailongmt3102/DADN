from django.urls import path
from .views import FarmApi

urlpatterns = [
    path('farm', FarmApi.as_view()),

]
