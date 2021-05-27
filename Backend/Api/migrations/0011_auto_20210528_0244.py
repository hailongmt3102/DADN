# Generated by Django 3.2.3 on 2021-05-27 19:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Api', '0010_auto_20210528_0012'),
    ]

    operations = [
        migrations.CreateModel(
            name='Air_Sensor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Ground_sensor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.AddField(
            model_name='sensordata',
            name='data_from_air_sensor',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='air_sensor', to='Api.air_sensor'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='sensordata',
            name='data_from_fround_sensor',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='ground_sensor', to='Api.ground_sensor'),
            preserve_default=False,
        ),
    ]
