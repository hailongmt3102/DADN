# Generated by Django 3.2.3 on 2021-06-12 04:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Api', '0016_alter_crop_crop_harvest_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='feed',
            name='feed_farm',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='feed_of_farm', to='Api.farm'),
            preserve_default=False,
        ),
    ]
