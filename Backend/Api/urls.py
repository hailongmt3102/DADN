from django.urls import path, include
# from .views import FarmApi
urlpatterns = [
    path("farm/", include('Api.Farm_api.urls')),
    path("field/", include('Api.Field_api.urls')),
    path("crop/", include('Api.Crop_api.urls')),
    path("production/", include("Api.Production_api.urls")),
    path("data/", include("Api.Sensor_data_api.urls")),
    path("water/", include("Api.Watering_api.urls")),
    # path("action/")
]
