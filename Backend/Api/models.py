# from typing_extensions import Required
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils.translation import gettext_lazy as _
from datetime import date, datetime

# Create your models here.


def upload_farm_iamge(instance, filename):
    return 'farm_image/{filename}'.format(filename=filename)


def upload_production_iamge(instance, filename):
    return 'production_image/{filename}'.format(filename=filename)


class Production(models.Model):

    production_name = models.CharField(max_length=50, default="")
    production_image = models.ImageField(
        _("ProductionImage"),
        upload_to=upload_production_iamge,
        default='production_image/default.jpg')
    production_period = models.IntegerField(default=0)


class Farm(models.Model):
    farm_name = models.CharField(max_length=50, default="")
    farm_image = models.ImageField(
        _("FarmImage"),
        upload_to=upload_farm_iamge,
        default='farm_image/default.jpg'
        )
    farm_create_at = models.DateTimeField(default= datetime.now)
    def __str__(self):
        return "Farm_"+str(self.id)


class Field(models.Model):
    field_location_index = models.IntegerField(unique=True, null=False)
    area_length = models.FloatField(
        validators=[MinValueValidator(0)], default=0
    )
    area_width = models.FloatField(
        validators=[MinValueValidator(0)], default=0
    )
    field_farm = models.ForeignKey(
        to="Farm", related_name='fields_of_farm', on_delete=models.CASCADE, null=False)
    field_create_at = models.DateTimeField(default= datetime.now)

    def __str__(self):
        return "Field_"+str(self.id)


class Crop(models.Model):
    state_range = ('hydrated', 'dehydrated', 'watering', 'harvested')

    crop_start_date = models.DateTimeField()
    crop_harvest_date = models.DateTimeField()
    crop_field = models.ForeignKey(
        to="Field", related_name='crops_of_field', on_delete=models.CASCADE, null=False)
    crop_production = models.ForeignKey(
        to="Production", related_name='production_of_crop', on_delete=models.CASCADE, null=False)

    # value = hydrated, dehydrated, harvestedd
    crop_state = models.CharField(max_length=10)

    def __str__(self):
        return "Crop_"+str(self.id)


class WateringHistory(models.Model):
    water_amount = models.FloatField(
        validators=[MinValueValidator(0)]
    )
    watering_start_time = models.DateTimeField()
    watering_end_time = models.DateTimeField()
    watering_crop = models.ForeignKey(
        to="Crop",
        related_name='water_for_crop',
        on_delete=models.CASCADE,
        null=True
    )
    Watering_field = models.ForeignKey(
        to="Field",
        related_name='water_for_field',
        on_delete=models.CASCADE,
        null=False
    )


class SensorData(models.Model):
    ground_humidity = models.FloatField()
    air_humidity = models.FloatField()
    air_temperature = models.FloatField()
    record_time = models.DateTimeField()
