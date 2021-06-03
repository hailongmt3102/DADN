# from typing_extensions import Required
# from Adafruit_IO.model import Data
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db.models.base import ModelState
from django.utils.translation import gettext_lazy as _
from datetime import date, datetime
from Adafruit_IO import Client, Data, Feed
import requests
import json
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
    farm_create_at = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return "Farm_"+str(self.id)

    def __int__(self):
        return self.id

    def collect_data(self):
        fields = Field.objects.filter(field_farm=self.id)
        [field.collect_data() for field in fields]


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
        print(devices_datas)
        # print(devices_datas)
        id_set = [item[0] for item in devices_datas]
        _data = self.latest_data()
        if not _data or (len( [
            True for id in id_set if id in [
                _data.data_ground_id,
                _data.data_air_id,
                _data.data_relay_id
            ]])!=3):

            new_data = SensorData(
                ground_humidity=devices_datas[0][1],
                data_ground_id=devices_datas[0][0],
                data_from_ground_sensor=devices_datas[0][2],

                air_humidity=devices_datas[1][2],
                air_temperature=devices_datas[1][1],
                data_air_id=devices_datas[1][0],
                data_from_air_sensor=devices_datas[1][3],

                is_relay_on=devices_datas[2][1],
                data_relay_id=devices_datas[2][0],
                data_from_relay=devices_datas[2][2],

                data_crop=self.get_active_crop(),
                data_field=self
            )
            new_data.save()
            self.handle_data(new_data)
            return new_data


    def handle_data(self, data):
        pass

    def latest_data(self):
        return SensorData.objects.filter(data_field=self.id).order_by("-id").first()

    def get_active_crop(self):
        query = Crop.objects.filter(crop_field=self.id).order_by("-id").first()
        if query and query.crop_state != 'harvested':
            return query
        return None


class Crop(models.Model):
    state_range = ('hydrated', 'dehydrated', 'harvested')

    crop_start_date = models.DateTimeField(default=datetime.now)
    crop_harvest_date = models.DateTimeField()
    crop_field = models.ForeignKey(
        to="Field", related_name='crops_of_field', on_delete=models.CASCADE, null=False)
    crop_production = models.ForeignKey(
        to="Production", related_name='production_of_crop', on_delete=models.CASCADE, null=False)
    crop_state = models.IntegerField(default=0)
    # 0 hydrated
    # 1 dehydrated
    # 3 harvested

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
    water_pump = models.ForeignKey(
        to="IOdevice",
        related_name='water_of_pump',
        on_delete=models.CASCADE,
        null=False
    )


class SensorData(models.Model):
    ground_humidity = models.FloatField(null=False)
    air_humidity = models.FloatField(null=False)
    air_temperature = models.FloatField(null=False)
    is_relay_on = models.BooleanField(null=False)
    record_time = models.DateTimeField(default=datetime.now)
    data_ground_id = models.CharField(max_length=30)
    data_air_id = models.CharField(max_length=30)
    data_relay_id = models.CharField(max_length=30)
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
    data_from_air_sensor = models.ForeignKey(
        to="IOdevice",
        related_name='air_sensor',
        on_delete=models.CASCADE,
        null=False
    )
    data_from_ground_sensor = models.ForeignKey(
        to="IOdevice",
        related_name='ground_sensor',
        on_delete=models.CASCADE,
        null=False
    )
    data_from_relay = models.ForeignKey(
        to="IOdevice",
        related_name='relay',
        on_delete=models.CASCADE,
        null=False
    )


"""feedname
CSE_BBC/feeds/bk-iot-temp-humid
CSE_BBC1/feeds/bk-iot-relay
CSE_BBC/feeds/bk-iot-soil
"""


class Feed(models.Model):
    feed_username = models.CharField(max_length=100, null=False)
    feed_key = models.CharField(max_length=100, null=False)

    def update_key(self):
        data = json.loads(requests.get(
            "http://dadn.esp32thanhdanh.link/").text)
        if self.feed_username == "CSE_BBC":
            self.feed_key = data["keyBBC"]
            self.save()
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
        related_name='air_sensor_of_field',
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
        # aio = Client(self.feed_username, self.feed_key)
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
            return [data.id, int(data.value),self]
        else:
            # print(data)
            res = [data.id]
            value = json.loads(data.value)
            res += tuple(map(
                lambda x: float(x),
                value["data"].split("-")))

            return res + [self]

    def push_data(self, _data):
        format=[
            {"id": "9", "name": "SOIL", "data": "2", "unit": "%"},
            {"id": "7", "name": "TEMP-HUMID", "data": "27-54", "unit": "C-%"},
            {"id": 11, "name": "RELAY", "data": 0, "unit": ""}
        ]
        self.check_feed()

        data=format[self.device_type]
        data["data"]=_data
        data=str(data).replace("'", '"')
        data=str(data).replace(" ", '')
        self.aio.create_data(self.device_feed_name, Data(value=str(data)))

    def __str__(self):
        return self.device_feed_name
