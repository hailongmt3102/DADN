from django.urls import path
from .views import CropsBaseView

urlpatterns = [
    path('<int:crop_id>', CropsBaseView.as_view()),

]
