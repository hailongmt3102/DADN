from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.


class Production(models.Model):
    production_name = models.CharField(max_length=50, default="")
    production_image_address = models.CharField(max_length=50, default="")
    production_period = models.IntegerField(default=0)


class Farm(models.Model):
    farm_name = models.CharField(max_length=50, default="")


class Field(models.Model):
    field_location_index = models.IntegerField()
    area_length = models.FloatField(
        validators=[MinValueValidator(0)]
    )
    area_width = models.FloatField(
        validators=[MinValueValidator(0)])
    field_farm = models.ForeignKey(
        to="Farm", related_name='farm_of_field', on_delete=models.CASCADE, null=False)


class Crop(models.Model):
    crop_start_date = models.DateField()
    crop_harvest_date = models.DateField()
    crop_field = models.ForeignKey(
        to="Field", related_name='field_of_crop', on_delete=models.CASCADE, null=False)
    crop_production = models.ForeignKey(
        to="Production", related_name='production_of_crop', on_delete=models.CASCADE, null=False)
    harvested = models.BooleanField(default=False)


class WateringHistory(models.Model):
    water_amount = models.FloatField(
        validators=[MinValueValidator(0)]
    )
    watering_start_time = models.DateField()
    watering_end_time = models.DateField()
    watering_crop = models.ForeignKey(
        to="Crop",
        related_name='water_for_crop',
        on_delete=models.CASCADE,
        null=False
    )


class SensorData(models.Model):
    ground_humidity = models.FloatField()
    air_humidity = models.FloatField()
    air_temperature = models.FloatField()
    record_time = models.DateField()
