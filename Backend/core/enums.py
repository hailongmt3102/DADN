from django.db import models
from enum import unique

@unique
class UserRole(models.TextChoices):
    OWNER = 'OWNER'
    WORKER = 'WORKER'

@unique
class CropState(models.TextChoices):
    HYDRATED = 'HYDRATED'
    DEHYDRATED = 'DEHYDRATED'
    HARVESTED = 'HARVESTED'


@unique
class SensorType(models.TextChoices):
    AIR = 'AIR'
    RELAY = 'RELAY'
    SOIL = 'SOIL'