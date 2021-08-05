from core.enums import CropState, SensorType
from django.core.validators import MinValueValidator
from core.models import ABCmodel
from django.db import models
import Adafruit_IO
import json
import pytz
import datetime
from functools import reduce
from product.models import Production
# Create your models here.


class Field(ABCmodel):
    class Meta:
        unique_together = [['location_index', 'farm']]

    location_index = models.IntegerField(null=False, blank=True, default=None)

    length = models.FloatField(
        validators=[MinValueValidator(0)], default=0
    )

    width = models.FloatField(
        validators=[MinValueValidator(0)], default=0
    )

    farm = models.ForeignKey(
        to="farm.Farm",
        related_name='field_farm',
        on_delete=models.CASCADE,
        null=False,
    )

    def save(self, *args, **kargs):
        if not self.location_index:
            max = Field.objects.filter(farm=self.farm.id).order_by(
                '-location_index').first()
            if not max:
                self.location_index = 1
            else:
                self.location_index = max.location_index+1
        return super().save(*args, **kargs)

    def __str__(self):
        return "Field_"+str(self.id)

    def toggle_relay(self, _relay_value: bool):
        field_relay: list[Sensor] = Sensor.objects.filter(
            field=self.id,
            sensor_type=SensorType.RELAY
        )

        for sensor in field_relay:
            sensor.push_data(1 if _relay_value else 0)
            
        self.collect_data()
        return True

    def latest_data(self):
        data = Data.objects.filter(
            field=self.id).order_by("-created_at").first()
        if not data:
            data = Data.objects.create(crop=self.current_crop(), field=self)
        return data

    def current_crop(self):
        qs = Crop.objects.filter(field=self.id)
        qs = qs.exclude(state=CropState.HARVESTED)
        crop = qs.first()
        return crop

    def collect_data(self):
        sensors = Sensor.objects.filter(field=self.id)
        sensors = sensors.order_by("sensor_type")

        sensor_datas = list(map(
            lambda device: device.collect(),
            sensors
        ))

        print(*sensor_datas,sep='\n'*5)

        sensor_datas = [data for data in sensor_datas if data]

        id_set = [item[0] for item in sensor_datas]

        latest_data: Data = self.latest_data()
        current_time = datetime.datetime.now()
        if latest_data:
            latest_data_created_at = latest_data.created_at
            _timedelta = current_time - latest_data_created_at
            _timedelta = _timedelta.total_seconds() / 60

        if (
            not latest_data
            or _timedelta >= 30
        ):
            _data = Data()
        else:
            _data = latest_data

        def average(lst):
            try:
                return sum([0] + lst) / (len(lst) if lst else 1)
            except Exception:
                return None

        _data.ground_humidity = average([item[1] for item in sensor_datas if item[-1] == SensorType.SOIL])

        _data.air_humidity = average([item[2] for item in sensor_datas if item[-1] == SensorType.AIR])

        _data.air_temperature = average([item[1] for item in sensor_datas if item[-1] == SensorType.AIR])

        _data.relay = reduce(
            lambda x, y: bool(x) or bool(y),
            [item[1] for item in sensor_datas if item[-1] == SensorType.RELAY],
            False
        )

        print([item[1] for item in sensor_datas if item[-1] == SensorType.RELAY])

        _data.field = self
        _data.crop = self.current_crop()
        # _data.record_time = current_time

        _data.save()

        self.handle_data(_data)
        return(_data)

    def latest_irrigation(self):
        return Irrigation.objects.filter(field=self.id).order_by("-created_at").first()

    def handle_data(self, data):
        is_relay_on = data.relay
        current_crop = self.current_crop()
        
        if current_crop:
            suggestion = current_crop.suggest(data)
        else:
            suggestion = False
        
        if self.farm.auto_mode:
            if suggestion ^ is_relay_on:
                print("alter", is_relay_on, "to", suggestion, "from field", self.id)
                return self.toggle_relay(suggestion)

        history: Irrigation = self.latest_irrigation()
        if history:
            historry_ended = history.end_at

        if is_relay_on and (
            not history or (history and historry_ended)
        ):
            print("new history made")
            new_history = Irrigation(
                start_at=data.updated_at,
                crop=data.crop,
                field=data.field,
            )
            new_history.save()

        elif not is_relay_on and history and not historry_ended:
            print("one history ended")
            history.end(data.updated_at)

        else:
            print("no action was taken")


class Crop(ABCmodel):

    started_at = models.DateTimeField(auto_now_add=True, auto_now=False)

    harvested_at = models.DateTimeField(null=True, blank=True)

    field = models.ForeignKey(
        to=Field,
        related_name='crop_field',
        on_delete=models.CASCADE,
        null=False
    )

    production = models.ForeignKey(
        to="product.Production",
        related_name='crop_production',
        on_delete=models.CASCADE,
        null=False
    )

    state = models.CharField(
        choices=CropState.choices, default=CropState.HYDRATED, max_length=32,
    )

    def suggest(self, data) -> bool:
        try:
            product: Production = self.production
            if data.ground_humidity >= product.soil_humid_upper_bound:
                return False
            elif data.ground_humidity <= product.soil_humid_lower_bound:
                return True
            elif data.air_temperature >= product.temp_upper_bound:
                return True
            elif data.air_temperature <= product.temp_lower_bound:
                return False
            return data.relay
        except Exception as exc:
            return False
    def __str__(self):
        return "Crop_"+str(self.id)


class Sensor(ABCmodel):

    class Meta:
        db_table = 'Sensor'

    name = models.CharField(max_length=50, null=False, blank=False)

    feed = models.ForeignKey(
        to="farm.Feed",
        related_name='sensor_feed',
        on_delete=models.CASCADE,
        null=False
    )

    field = models.ForeignKey(
        to="Field",
        related_name='sensor_field',
        on_delete=models.CASCADE,
        null=False
    )

    sensor_type = models.CharField(
        choices=SensorType.choices, default=SensorType.SOIL, max_length=32,
    )

    is_test = models.BooleanField(default=True)

    @property
    def aio(self):
        if not hasattr(self, '_aio') or not isinstance(self._aio, Adafruit_IO.Client):
            self._aio = Adafruit_IO.Client(
                self.feed.username,
                self.feed.key
            )
        return self._aio

    def collect(self):
        try:
            client = self.aio
            data = client.receive(self.name)
            if data:
                return self.process_data(data)
            return None
        except Exception as exception:
            return None

    def process_data(self, data):
        if self.is_test and self.sensor_type == SensorType.RELAY:
            return [data.id, int(data.value), self, self.sensor_type]
        else:
            res = [data.id]
            value = json.loads(data.value)
            res += tuple(map(lambda x: float(x), value["data"].split("-")))
            return res + [self, self.sensor_type]

    def push_data(self, _data):
        format = {
            SensorType.SOIL: {"id": "9", "name": "SOIL", "data": "2", "unit": "%"},
            SensorType.AIR: {"id": "7", "name": "TEMP-HUMID", "data": "27-54", "unit": "C-%"},
            SensorType.RELAY: {"id": "11","name": "RELAY", "data": "0", "unit": ""}
        }

        if (self.is_test and self.sensor_type == SensorType.RELAY):
            self.aio.create_data(self.name, Adafruit_IO.Data(value=_data))
            return
        data = format[self.sensor_type]
        data["data"] = str(_data)
        # data = str(data).replace("'", '"')
        # data = str(data).replace(" ", '')
        data = json.dumps(data)
        self.aio.create_data(self.name,Adafruit_IO.Data(value=str(data)))

    def __str__(self):
        return self.name


class Data(ABCmodel):

    class Meta:
        db_table = 'data'

    ground_humidity = models.FloatField(null=True)

    air_humidity = models.FloatField(null=True)

    air_temperature = models.FloatField(null=True)

    relay = models.BooleanField(default=False)

    crop = models.ForeignKey(
        to="Crop",
        related_name='data_crop',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    field = models.ForeignKey(
        to="Field",
        related_name='data_field',
        on_delete=models.CASCADE,
        null=False
    )


class Irrigation(ABCmodel):

    class Meta:
        db_table = 'Irrigation'

    amount = models.FloatField(
        validators=[MinValueValidator(0)],
        null=True,
    )

    start_at = models.DateTimeField(auto_now_add=True)

    end_at = models.DateTimeField(null=True)

    crop = models.ForeignKey(
        to="Crop",
        related_name='irrigation_crop',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    field = models.ForeignKey(
        to="Field",
        related_name='water_for_field',
        on_delete=models.CASCADE,
        null=False
    )

    #  = models.ForeignKey(
    #     to="Sensor",
    #     related_name='',
    #     on_delete=models.CASCADE,
    #     null=True,
    # )

    def end(self, time):
        self.end_at = time
        self.save()
