from .field_permissions import is_field_related

def is_sensor_related(user, sensor):
    field = sensor.field
    return is_field_related(user,field)