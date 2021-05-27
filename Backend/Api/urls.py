from django.urls import path, include
# from .views import FarmApi
urlpatterns = [
    path("farm/", include('Farm_api.urls')),
    path("field/", include('Field_api.urls')),
    path("production/", include("Production_api.urls"))
]
