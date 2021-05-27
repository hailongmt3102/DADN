from django.urls import path, include
from .views import FarmApi, FarmFieldsLatestCropApi
urlpatterns = [
    path("", FarmApi.as_view()),
    path("fields/", FarmFieldsLatestCropApi.as_view()),
    path("<int:field_id>/", include('Field_api.urls')),
]
