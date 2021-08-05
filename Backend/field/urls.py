from django.urls import path, include
from .views import field_api, crop_api, sensor_api, data_api, irrigation_api

data_url_patterns = [
    path('/matrix', data_api.data_matrix, name='matrix_data'),
    path('/get', data_api.data_get, name='get_data'),

]

irrigation_url_patterns = [
    path('/matrix', irrigation_api.irrigation_matrix, name='matrix_irrigation'),
    path('/get', irrigation_api.irrigation_get, name='get_irrigation'),
]

crop_url_patterns = [
    path('/current_crop',crop_api.field_active_crop),
    path('/matrix',crop_api.crop_matrix),
    path('/get',crop_api.crop_get),
    path('/create',crop_api.crop_create),
    path('/harvest',crop_api.harvest_crop),
]

sensor_url_patterns = [
    path('/get', sensor_api.sensor_get, name='read_sensor'),
    path('/matrix', sensor_api.sensor_matrix, name='matrix_sensor'),
    path('/create', sensor_api.sensor_create, name='create_sensor'),
    path('/delete', sensor_api.sensor_delete, name='delete_sensor'),
]

urlpatterns = [
    path('/get', field_api.field_get, name='read_field'),
    path('/matrix', field_api.fields_list, name='matrix_field'),
    path('/create', field_api.field_create, name='create_field'),
    path('/toggle', field_api.field_toggle, name='toggle_field'),
    path('/crops',include(crop_url_patterns)),
    path('/sensors',include(sensor_url_patterns)),
    path('/datas',include(data_url_patterns)),
    path('/irrigations',include(irrigation_url_patterns)),
]
