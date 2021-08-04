from django.db import models
from django.utils.translation import gettext_lazy as _
from user.models import User, UserProfile
from core.models import ABCmodel
from core.enums import UserRole
# Create your models here.


def upload_farm_iamge(instance, filename):
    return 'farm_image/{filename}'.format(filename=filename)


class Farm(ABCmodel):

    class Meta:
        db_table = 'farm'

    name = models.CharField(max_length=50, default="")

    image = models.ImageField(
        _("farm_image"),
        upload_to=upload_farm_iamge,
        default='farm_image/default.jpg'
    )

    longtitude  = models.FloatField(default=0)
    
    latitude    = models.FloatField(default=0)

    auto_mode = models.BooleanField(default=False)

    def __str__(self):
        return "Farm_"+str(self.id)

    def __int__(self):
        return self.id

    def collect_data(self):
        from field.models import Field
        fields = Field.objects.filter(farm=self.id)
        [field.collect_data() for field in fields]


class UserFarm(ABCmodel):
    class Meta:
        db_table = 'user_farm'
        unique_together = 'user','farm'

    user = models.ForeignKey(
        to=UserProfile,
        to_field='uuid',
        on_delete=models.CASCADE,
        related_name='user_farm_user'
    )

    farm = models.ForeignKey(
        to=Farm,
        to_field='uuid',
        on_delete=models.CASCADE,
        related_name='user_farm_farm'
    )

    role = models.CharField(
        max_length=32, choices=UserRole.choices, default=UserRole.OWNER)


class Feed(ABCmodel):
    
    username = models.CharField(max_length=100, null=False, unique= True)
    key = models.CharField(max_length=100, null=False)

    farm = models.ForeignKey(
        to="Farm",
        to_field = 'uuid',
        related_name='feed_farm',
        on_delete=models.CASCADE,
        null=False,
    )

    # def update_key(self):
    #     data = json.loads(requests.get(
    #         "http://dadn.esp32thanhdanh.link/").text)
    #     if self.feed_username == "CSE_BBC":
    #         self.feed_key = data["keyBBC"]

    #     elif self.feed_username == "CSE_BBC1":
    #         self.feed_key = data["keyBBC1"]
    #     self.save()

    def __str__(self):
        return self.username
