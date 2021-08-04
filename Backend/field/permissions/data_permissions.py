from .field_permissions import is_field_related

def is_data_related(user, data):
    field = data.field
    return is_field_related(user,field)