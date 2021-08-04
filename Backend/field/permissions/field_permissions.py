from farm.permissions import is_farm_related

def is_field_related(user, field:list):
    farm = field.farm
    return is_farm_related(user,farm)