from django.core.management.base import BaseCommand
from Api.models import *
import time
from random import randint
from django.core.management.base import BaseCommand, CommandError
from Adafruit_IO import Data


class Command(BaseCommand):
    help = 'The help information for this command.'

    def add_arguments(self, parser):
        parser.add_argument('--cycle', type=int, default=40,
                            help='update cycle')

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS(
            f'sensors data will be check after every {options["cycle"]}'))
        while True:
            Farm_set: list[Farm] = list(Farm.objects.all())
            [farm.collect_data() for farm in Farm_set]
            time.sleep(options["cycle"])
        