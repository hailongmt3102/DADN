from django.urls import path, include
# from .views import FarmApi
urlpatterns = [
    # path('farm/', FarmApi.as_view()),
    # path('crop',include('Crop_api.urls'))
    # path("farm", include('Farm_api.urls')),
    path("farm/", include('Farm_api.urls'))
]
