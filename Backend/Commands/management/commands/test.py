from django.core.management.base import BaseCommand
from Api.models import *
import time
from random import randint
from django.core.management.base import BaseCommand, CommandError
from Adafruit_IO import Data
from datetime import datetime

class Command(BaseCommand):
    def handle(self, *args, **options):
        object: WateringHistory = WateringHistory.objects.order_by(
            "-id").first()
        print(object.watering_end_time)
        temp:datetime = object.watering_end_time
        temp = temp.replace(tzinfo=None)
        now = datetime.utcnow()
        print(now)
        difference = now - temp
        print(difference)
