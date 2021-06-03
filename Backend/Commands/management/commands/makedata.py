from django.core.management.base import BaseCommand
from django.db.models import query
from Api.models import *
import time
from random import randint
from django.core.management.base import BaseCommand, CommandError
from Adafruit_IO import Data
from random import randint, random


class Command(BaseCommand):
    help = 'The help information for this command.'

    def add_arguments(self, parser):
        parser.add_argument('--cycle', type=int, default=40,
                            help='update cycle')

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS(
            f'sensors data will be push after every {options["cycle"]}s'))
        fields = Field.objects.all()
        while (True):
            for field in fields:
                query_set = IODevice.objects.filter(device_field = field.id)
                for device in query_set:
                    latest_data: SensorData = SensorData.objects.filter(
                        data_field=device.device_field.id).order_by('-id').first()
                    if not latest_data:
                        latest_data = SensorData()
                        latest_data.ground_humidity = 10
                        latest_data.air_temperature = 27
                        latest_data.air_humidity = 9
                    if latest_data:
                        data = None
                        if device.device_type == 0:
                            data = str(
                                latest_data.ground_humidity +
                                randint(-1, 1)*(random()/8) *
                                latest_data.ground_humidity
                            )
                        elif device.device_type == 1:
                            data = (
                                str(
                                    latest_data.air_temperature +
                                    randint(-1, 1)*(random()/8) *
                                    latest_data.air_temperature
                                )
                                + "-" + str(
                                    latest_data.air_humidity +
                                    randint(-1, 1)*(random()/8) *
                                    latest_data.air_humidity
                                )
                            )
                        else: continue
                        print(data)
                        device.push_data(data)
            time.sleep(options["cycle"])
