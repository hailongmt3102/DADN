from re import search
# from Adafruit_IO.model import Feed
from rest_framework import serializers
from Api.models import IODevice, Field, Feed


class DeviceOfFieldSerializer(serializers.ModelSerializer):
    class DeviceBriefSerializer(serializers.ModelSerializer):

        class Meta:
            model = IODevice
            fields = [
                "id",
                "device_feed_name",
                "device_type",
            ]
    device_of_field = DeviceBriefSerializer(many=True)

    class Meta:
        model = Field
        fields = [
            "id",
            "device_of_field"
        ]


class FeedSerializer (serializers.ModelSerializer):
    class Meta:
        model = Feed
        fields = [
            "feed_username",
            "feed_key"
        ]


class DeviceSerializer(serializers.BaseSerializer):
    def to_representation(self, instance: IODevice):
        feed = instance.device_feed
        feed: dict = FeedSerializer(feed).data
        data = {
            "id": instance.id,
            "device_feed_name": instance.device_feed_name,
            "device_type": instance.device_type,
            **feed
        }
        return data
