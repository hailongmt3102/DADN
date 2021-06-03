from Adafruit_IO import Client, Feed, Data

aio = Client("CSE_BBC","aio_CraM232LDztkYUG2RxHySDg7ZUTr")


print(aio.receive("bk-iot-soil"))