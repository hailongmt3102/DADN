from django.core.management.base import BaseCommand
from Api.models import *
import time
from random import randint
from django.core.management.base import BaseCommand, CommandError
from Adafruit_IO import Data
from datetime import datetime
import pytz

class Command(BaseCommand):
    def handle(self, *args, **options):
        devices = list(IODevice.objects.filter().order_by("id"))
        fields = list(Field.objects.all().order_by("id"))
        field: Field = Field.objects.all().first()
        print(field.collect_data())
