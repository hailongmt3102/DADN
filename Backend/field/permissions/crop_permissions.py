from .field_permissions import is_field_related

def is_crop_related(user, crop:list):
    field = crop.field
    return is_field_related(user,field)