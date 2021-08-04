from farm.models import UserFarm

def is_farm_related(user, farm:list):
    qs = UserFarm.objects.filter(farm=farm.uuid,user=user.profile.uuid)
    return qs.count() != 0
