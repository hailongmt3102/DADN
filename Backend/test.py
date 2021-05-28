# Import library and create instance of REST client.
from Adafruit_IO import Client
aio = Client('CSE_BBC','aio_bwTZ28eqDWOHCAX5MwKWW2iyMJuJ')

# Get list of feeds.
feeds = aio.feeds()

# Print out the feed names:
for f in feeds:
    print('Feed: {0}'.format(f.name))


data = aio.receive('bk-iot-temp-humid')
print('Received value: {0}'.format(data))
