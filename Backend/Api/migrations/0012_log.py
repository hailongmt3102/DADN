# Generated by Django 3.2.3 on 2021-06-04 08:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Api', '0011_alter_wateringhistory_water_amount'),
    ]

    operations = [
        migrations.CreateModel(
            name='log',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=1000000)),
            ],
        ),
    ]
