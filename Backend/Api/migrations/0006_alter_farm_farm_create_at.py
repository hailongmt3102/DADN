# Generated by Django 3.2.3 on 2021-05-26 22:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Api', '0005_auto_20210527_0518'),
    ]

    operations = [
        migrations.AlterField(
            model_name='farm',
            name='farm_create_at',
            field=models.DateField(),
        ),
    ]