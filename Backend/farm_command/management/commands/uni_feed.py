from django.core.management.base import BaseCommand
from Api.models import *
import time
from random import randint
from django.core.management.base import BaseCommand, CommandError
from Adafruit_IO import Data
from datetime import datetime

class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('--mode', type=str, default="on",
                            help='update cycle')
    def handle(self, *args, **options):
        if options["mode"] == "on":
            feeds = Feed.objects.filter(feed_username = "CSE__BBC")
            if feeds: return
            feed1 = Feed()
            feed1.feed_username = "CSE_BBC"
            feed1.feed_key = "CSE_BBC"
            feed1.save()
            feed1.update_key()
            feed2 = Feed()
            feed2.feed_username = "CSE_BBC1"
            feed2.feed_key = "CSE_BBC"
            feed2.save()
            feed2.update_key()
            field = Field()
            field.field_location_index = Field.objects.filter(field_farm = 1).order_by("-id").first().field_location_index + 1
            field.area_length, field.area_width = [5]*2
            field.field_farm = Farm.objects.get(id = 1)
            field.save()
            names = ["bk-iot-soil","bk-iot-temp-humid","bk-iot-relay"]
            for name in names:
                device = IODevice()
                device.device_type = names.index(name)
                device.device_feed = feed1 if device.device_type < 2 else feed2
                device.device_feed_name = name
                device.device_field = field
                device.is_my_device = False
                device.save()
        elif options["mode"] == "off":
            device = IODevice.objects.filter(is_my_device = False).first()
            if device:
                device.device_field.delete()