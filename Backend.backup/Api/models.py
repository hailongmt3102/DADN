# from typing_extensions import Required
# from Adafruit_IO.model import Data
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db.models.base import ModelState
from django.utils.translation import gettext_lazy as _
from datetime import date, datetime
from Adafruit_IO import Client, Data, Feed, model
import requests
import json
import pytz
from functools import reduce
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
    production_air_temp_lower_bound = models.FloatField(null=False)
    production_air_temp_upper_bound = models.FloatField(null=False)
    production_soil_humid_lower_bound = models.FloatField(null=False)
    production_soil_humid_upper_bound = models.FloatField(null=False)


class Farm(models.Model):
    farm_name = models.CharField(max_length=50, default="")
    farm_image = models.ImageField(
        _("FarmImage"),
        upload_to=upload_farm_iamge,
        default='farm_image/default.jpg'
    )
    farm_create_at = models.DateTimeField(default=datetime.now)
    farm_auto_mode = models.BooleanField(default=False)  # True auto_mode

    def __str__(self):
        return "Farm_"+str(self.id)

    def __int__(self):
        return self.id

    def collect_data(self):
        fields = Field.objects.filter(field_farm=self.id)
        [field.collect_data() for field in fields]


class SensorData(models.Model):
    ground_humidity = models.FloatField(null=True)
    air_humidity = models.FloatField(null=True)
    air_temperature = models.FloatField(null=True)
    is_relay_on = models.BooleanField(null=True)
    record_time = models.DateTimeField(default=datetime.now)
    data_ground_id = models.CharField(max_length=30, null=True)
    data_air_id = models.CharField(max_length=30, null=True)
    data_relay_id = models.CharField(max_length=30, null=True)
    data_crop = models.ForeignKey(
        to="Crop",
        related_name='data_of_crop',
        on_delete=models.CASCADE,
        null=True
    )
    data_field = models.ForeignKey(
        to="Field",
        related_name='data_of_field',
        on_delete=models.CASCADE,
        null=False
    )


class Field(models.Model):
    field_location_index = models.IntegerField(null=False)
    area_length = models.FloatField(
        validators=[MinValueValidator(0)], default=0
    )
    area_width = models.FloatField(
        validators=[MinValueValidator(0)], default=0
    )
    field_farm = models.ForeignKey(
        to="Farm", related_name='fields_of_farm', on_delete=models.CASCADE, null=False)
    field_create_at = models.DateTimeField(default=datetime.now)
    # field_stat = models.BooleanField(default=True)  # is watering or not

    def __str__(self):
        return "Field_"+str(self.id)

    def collect_data(self):
        devices = IODevice.objects.filter(
            device_field=self.id).order_by("device_type")
        devices_datas = list(map(
            lambda device: device.collect(),
            devices
        ))

        devices_datas = [i for i in devices_datas if i]

        id_set = [item[0] for item in devices_datas]
        _data: SensorData = self.latest_data()
        if _data:
            _time = _data.record_time

        current_time = datetime.now(pytz.UTC)
        if (
            not _data
            or _time.time().hour !=
            current_time.time().hour
            or (_time.time().hour == current_time.time().hour and current_time.date() != _time.date())
        ):
            _data = SensorData()

        def average(lst):
            try:
                return sum([0] + lst) / (len(lst) if lst else 1)
            except Exception:
                return None

        _data.ground_humidity = average(
            [item[1] for item in devices_datas if item[-1] == 0])

        _data.air_humidity = average(
            [item[2] for item in devices_datas if item[-1] == 1])

        _data.air_temperature = average(
            [item[1] for item in devices_datas if item[-1] == 1])

        _data.is_relay_on = reduce(
            lambda x,y: bool(x) or bool(y),
            [item[1] for item in devices_datas if item[-1] == 2],
            False)

        _data.data_field = self
        _data.data_crop = self.get_active_crop()
        _data.record_time = current_time

        _data.save()

        self.handle_data(_data)
        return(_data)

    def handle_data(self, data: SensorData):
        is_relay_on = data.is_relay_on
        suggestion = self.get_active_crop().suggest(data) if self.get_active_crop() else False
        print(suggestion)
        if self.field_farm.farm_auto_mode:
            if suggestion ^ is_relay_on:
                print("alter", is_relay_on, "to", suggestion, "from", self.id)
                return self.toggle_relay(suggestion)
        history: WateringHistory = self.latest_water_history()
        if history:
            historry_ended = history.watering_end_time

        if is_relay_on and (
            not history or (history and historry_ended)
        ):
            print("new history made")
            new_history = WateringHistory(
                watering_start_time=data.record_time,
                watering_crop=data.data_crop,
                watering_field=data.data_field,
            )
            new_history.save()
        elif not is_relay_on and history and not historry_ended:
            print("one history ended")
            history.end_history(data.record_time)
        else:
            print("no action was taken")

    def toggle_relay(self, _relay_value: bool):
        field_relay: list[IODevice] = IODevice.objects.filter(
            device_field=self.id,
            device_type=2
        )
        for device in field_relay:
            device.push_data(1 if _relay_value else 0)
        self.collect_data()
        return True

    def latest_data(self):
        return SensorData.objects.filter(data_field=self.id).order_by("-id").first()

    def latest_water_history(self):
        return WateringHistory.objects.filter(watering_field=self.id).order_by("-id").first()

    def get_active_crop(self):
        query = Crop.objects.filter(crop_field=self.id).order_by("-id").first()
        if query and query.crop_state != 'harvested':
            return query
        return None


class Crop(models.Model):
    state_range = ('hydrated', 'dehydrated', 'harvested')

    crop_start_date = models.DateTimeField(default=datetime.now)
    crop_harvest_date = models.DateTimeField(null=True)
    crop_field = models.ForeignKey(
        to="Field", related_name='crops_of_field', on_delete=models.CASCADE, null=False)
    crop_production = models.ForeignKey(
        to="Production", related_name='production_of_crop', on_delete=models.CASCADE, null=False)
    crop_state = models.IntegerField(default=0)
    # 0 hydrated
    # 1 dehydrated
    # 3 harvested

    def suggest(self, data: SensorData) -> bool:
        product: Production = self.crop_production
        if data.ground_humidity >= product.production_soil_humid_upper_bound:
            return False
        elif data.ground_humidity <= product.production_soil_humid_lower_bound:
            return True
        elif data.air_temperature >= product.production_air_temp_upper_bound:
            return True
        elif data.air_temperature <= product.production_air_temp_lower_bound:
            return False
        return data.is_relay_on

    def __str__(self):
        return "Crop_"+str(self.id)


class WateringHistory(models.Model):
    water_amount = models.FloatField(
        validators=[MinValueValidator(0)], null=True
    )
    watering_start_time = models.DateTimeField(default=datetime.now)
    watering_end_time = models.DateTimeField(null=True)
    watering_crop = models.ForeignKey(
        to="Crop",
        related_name='water_for_crop',
        on_delete=models.CASCADE,
        null=True
    )
    watering_field = models.ForeignKey(
        to="Field",
        related_name='water_for_field',
        on_delete=models.CASCADE,
        null=False
    )
    water_pump = models.ForeignKey(
        to="IOdevice",
        related_name='water_of_pump',
        on_delete=models.CASCADE,
        null=True
    )

    def end_history(self, time):
        self.watering_end_time = time
        self.save()


"""feedname
CSE_BBC/feeds/bk-iot-temp-humid
CSE_BBC1/feeds/bk-iot-relay
CSE_BBC/feeds/bk-iot-soil
"""


class Feed(models.Model):
    feed_username = models.CharField(max_length=100, null=False)
    feed_key = models.CharField(max_length=100, null=False)
    feed_farm = models.ForeignKey(
        to="Farm",
        related_name='feed_of_farm',
        on_delete=models.CASCADE,
        null=False
    )

    def update_key(self):
        data = json.loads(requests.get(
            "http://dadn.esp32thanhdanh.link/").text)
        if self.feed_username == "CSE_BBC":
            self.feed_key = data["keyBBC"]

        elif self.feed_username == "CSE_BBC1":
            self.feed_key = data["keyBBC1"]
        self.save()

    def __str__(self):
        return self.feed_username


class IODevice(models.Model):
    device_feed_name = models.CharField(max_length=50, null=False)
    device_feed: Feed = models.ForeignKey(
        to="Feed",
        related_name='feed_of_device',
        on_delete=models.CASCADE,
        null=False
    )

    device_field = models.ForeignKey(
        to="Field",
        related_name='device_of_field',
        on_delete=models.CASCADE,
        null=False
    )
    # output = models.BooleanField(default=False)
    device_type = models.IntegerField(
        validators=[
            MaxValueValidator(3),
            MinValueValidator(0)
        ]
    )
    """
    0:soil
    1:temp-humid
    2:pump(relay)
    """
    is_my_device = models.BooleanField(default=True)

    def check_feed(self):
        try:
            if not hasattr(IODevice, 'aio'):
                self.aio = Client(
                    self.device_feed.feed_username,
                    self.device_feed.feed_key
                )
            feed = self.aio.feeds(self.device_feed_name)

        except Exception as update_feed:
            if not self.is_my_device:
                self.device_feed.update_key()
            self.aio = Client(
                self.device_feed.feed_username,
                self.device_feed.feed_key
            )

    def collect(self):
        self.check_feed()
        try:
            data = self.aio.receive(self.device_feed_name)
            if data:
                return self.process_data(data)
            return None
        except Exception as f:
            print(f)
            return None

    def process_data(self, data):
        if self.is_my_device and self.device_type == 2:
            return [data.id, int(data.value), self, self.device_type]
        else:
            # print(data)
            res = [data.id]
            value = json.loads(data.value)
            res += tuple(map(
                lambda x: float(x),
                value["data"].split("-")))

            return res + [self, self.device_type]

    def push_data(self, _data):
        format = [
            {"id": "9", "name": "SOIL", "data": "2", "unit": "%"},
            {"id": "7", "name": "TEMP-HUMID", "data": "27-54", "unit": "C-%"},
            {"id": "11", "name": "RELAY", "data": "0", "unit": ""}
        ]

        self.check_feed()
        if (self.is_my_device and self.device_type == 2):
            self.aio.create_data(self.device_feed_name, Data(value=_data))
            return
        data = format[self.device_type]
        data["data"] = str(_data)
        data = str(data).replace("'", '"')
        data = str(data).replace(" ", '')
        self.aio.create_data(self.device_feed_name, Data(value=str(data)))

    def __str__(self):
        return self.device_feed_name


class log(models.Model):
    text = models.CharField(max_length=1000000)
