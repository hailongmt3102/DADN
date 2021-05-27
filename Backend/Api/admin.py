from django.contrib import admin
from Api.models import *
# Register your models here.

@admin.register(Production)
class AdminProduction(admin.ModelAdmin):pass

@admin.register(Farm)
class AdminFarm(admin.ModelAdmin):pass

@admin.register(Field)
class AdminField(admin.ModelAdmin):pass

@admin.register(Crop)
class AdminCrop(admin.ModelAdmin):pass

@admin.register(WateringHistory)
class AdminWateringHistory(admin.ModelAdmin):pass

@admin.register(SensorData)
class AdminSensorData(admin.ModelAdmin):pass

@admin.register(Pump)
class AdminSensorData(admin.ModelAdmin):pass

@admin.register(AirSensor)
class AdminSensorData(admin.ModelAdmin):pass

@admin.register(GroundSensor)
class AdminSensorData(admin.ModelAdmin):pass