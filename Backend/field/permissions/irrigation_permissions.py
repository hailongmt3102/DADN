from .field_permissions import is_field_related

def is_irrigation_related(user, irrigation):
    field = irrigation.field
    return is_field_related(user,field)