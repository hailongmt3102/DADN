# Generated by Django 3.2.3 on 2021-07-25 02:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('farm', '0004_feed_farm'),
    ]

    operations = [
        migrations.AddField(
            model_name='farm',
            name='latitude',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='farm',
            name='longtitude',
            field=models.FloatField(default=0),
        ),
    ]
