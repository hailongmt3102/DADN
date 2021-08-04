# Generated by Django 3.2.3 on 2021-07-17 16:30

from django.db import migrations, models
import product.models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Production',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', models.UUIDField(auto_created=True, default=uuid.uuid4, editable=False, unique=True)),
                ('_created_at', models.DateTimeField(auto_now_add=True, db_column='created_at')),
                ('_updated_at', models.DateTimeField(auto_now=True, db_column='updated_at')),
                ('name', models.CharField(default='', max_length=50)),
                ('image', models.ImageField(default='production_image/default.jpg', upload_to=product.models.upload_production_iamge, verbose_name='ProductionImage')),
                ('period', models.IntegerField(default=0)),
                ('temp_lower_bound', models.FloatField()),
                ('temp_upper_bound', models.FloatField()),
                ('soil_humid_lower_bound', models.FloatField()),
                ('humid_upper_bound', models.FloatField()),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
