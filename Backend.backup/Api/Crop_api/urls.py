from django.urls import path
from .views import CropsBaseView, CropCreateView

urlpatterns = [
    path('<int:crop_id>/', CropsBaseView.as_view()),
    path('create/', CropCreateView.as_view()),
    
]
