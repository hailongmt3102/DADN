from django.db import models
from django.utils.translation import gettext_lazy
from core.models import ABCmodel


def upload_production_iamge(instance, filename):
    return 'production_image/{filename}'.format(filename=filename)


class Production(ABCmodel):

    name = models.CharField(max_length=50, default="")

    image = models.ImageField(
        gettext_lazy("ProductionImage"),
        upload_to=upload_production_iamge,
        default='production_image/default.jpg',
    )

    period = models.IntegerField(default=0)

    temp_lower_bound = models.FloatField(null=False)

    temp_upper_bound = models.FloatField(null=False)

    soil_humid_lower_bound = models.FloatField(null=False)

    soil_humid_upper_bound = models.FloatField(null=False)
