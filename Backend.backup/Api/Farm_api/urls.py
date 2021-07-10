from django.urls import path, include
from .views import FarmApi, FarmFieldsLatestCropApi, ToggleAutoView, RenewFarmInfo
urlpatterns = [
    path("", FarmApi.as_view()),
    path("fields/", FarmFieldsLatestCropApi.as_view()),
    path("toggle/", ToggleAutoView.as_view()),
    path("renew/", RenewFarmInfo.as_view()),
]
