from django.urls import path
from .views import CropsBaseView

urlpatterns = [
    path('', CropsBaseView.as_view()),

]
