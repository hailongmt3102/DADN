from django.core.management.base import BaseCommand
from Api.models import *
import time
from random import randint
from django.core.management.base import BaseCommand, CommandError
from Adafruit_IO import Data
from datetime import datetime

class Command(BaseCommand):
    def handle(self, *args, **options):
        devices =list(IODevice.objects.filter().order_by("id"))
        fields =list( Field.objects.all().order_by("id"))
        for field in fields :
            for i in range(3):
                # print(field)
                # print(devices)
                print(devices[0],devices[0].device_field)
                # devices[0].device_field = field
                # devices[0].save()
                devices = devices[1:]