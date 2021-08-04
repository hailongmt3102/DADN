from django.urls import path, re_path, include
from .views import FarmView, FeedView

feeds_url_patterns = [
    path('/matrix', FeedView.as_view({'post': 'list'}), name='matrix_feed'),
    path('/get', FeedView.as_view({'get': 'get'}), name='get_feed'),
    path('/create', FeedView.as_view({'post': 'create'}), name='create_feed'),
    path('/update', FeedView.as_view({'post': 'update'}), name='update_feed'),
]

urlpatterns = [
    path('/get', FarmView.as_view({'post': 'read'}), name='read_farm'),
    path('/matrix', FarmView.as_view({'post': 'read'}), name='matrix_farm'),
    path('/create', FarmView.as_view({'post': 'create'}), name='create_farm'),
    path('/feeds', include(feeds_url_patterns))
]
