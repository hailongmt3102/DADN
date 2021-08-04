# Generated by Django 3.2.3 on 2021-08-04 04:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('field', '0010_auto_20210803_2115'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sensor',
            name='sensor_type',
            field=models.CharField(choices=[('AIR', 'Air'), ('RELAY', 'Relay'), ('SOIL', 'Soil')], default='SOIL', max_length=32),
        ),
    ]
