# Generated by Django 3.2.3 on 2021-05-26 12:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Api', '0002_rename_production_image_address_production_production_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='field',
            name='field_location_index',
            field=models.IntegerField(default=-1),
        ),
    ]