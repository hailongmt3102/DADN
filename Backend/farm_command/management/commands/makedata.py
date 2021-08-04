from django.core.management.base import BaseCommand
from django.db.models import query
from field.models import *
from farm.models import *
import time
from random import randint
from django.core.management.base import BaseCommand, CommandError
from random import randint, random
from core.enums import SensorType

class Command(BaseCommand):
    help = 'The help information for this command.'

    def add_arguments(self, parser):
        parser.add_argument('--cycle', type=int,default=40, help='update cycle')
        parser.add_argument('--manual', type=bool, help='type', default = False)

    def push(self, data, field: Field, typ):
        for device in Sensor.objects.filter(device_field=field.id, device_type=typ):
            device.push_data(data)

    def handle(self, *args, **options):
        if options["manual"]:
            while True:
                try:
                    field = Field.objects.get(id=int(input("field id:")))
                    choice = int(input("1.soil\n2.temp-humid\nchoose:"))
                    if choice == 1:
                        self.push(
                            str(round(float(input("soil: ")), 2)), field, 0)
                    elif choice == 2:
                        self.push(
                            str(round(float(input("temp: ")), 2)) + "-" +
                            str(round(float(input("humid: ")), 2)),
                            field, 1
                        )
                    else:
                        break

                except Exception as err:
                    print(err)
                print("\033[H\033[2J")
        else:
            self.stdout.write(self.style.SUCCESS(f'sensors data will be push after every {options["cycle"]}s'))
            fields = Field.objects.all()
            while (True):
                for field in fields:
                    query_set = Sensor.objects.filter(field=field.id)
                    for device in query_set:
                        _field:Field = device.field
                        latest_data: Data = _field.latest_data()
                        if not latest_data:
                            latest_data = Data()
                            latest_data.ground_humidity = 10
                            latest_data.air_temperature = 27
                            latest_data.air_humidity = 9
                        if latest_data:
                            data = None
                            if device.sensor_type == SensorType.SOIL:
                                value = latest_data.ground_humidity or 10
                                data = str(int((randint(-1, 1)*(random()/8) +1) *value))
                            elif device.sensor_type == SensorType.AIR:
                                temp_value = latest_data.air_temperature or 20
                                humid_value = latest_data.air_humidity or 10
                                data = (
                                    str(int((randint(-1, 1)*(random()/8) +1) *temp_value))
                                    + "-" + str(int((randint(-1, 1)*(random()/8) +1) *humid_value))
                                )
                            else:
                                continue
                            print(data)
                            device.push_data(data)
                time.sleep(options["cycle"])
