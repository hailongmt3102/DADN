# Generated by Django 3.2.3 on 2021-05-26 11:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='production',
            old_name='production_image_address',
            new_name='production_image',
        ),
    ]
