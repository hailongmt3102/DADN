# Generated by Django 3.2.3 on 2021-05-27 19:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Api', '0012_auto_20210528_0253'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Air_Sensor',
            new_name='AirSensor',
        ),
        migrations.RenameModel(
            old_name='Ground_sensor',
            new_name='GroundSensor',
        ),
    ]
