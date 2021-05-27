from django.urls import path, include
from .views import FieldApi
urlpatterns = [
    path("", FieldApi.as_view()),
    path("crop/", FieldApi.as_view()),
]
