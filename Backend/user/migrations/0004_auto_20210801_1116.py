# Generated by Django 3.2.3 on 2021-08-01 11:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_user_is_staff'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='_created_at',
            new_name='created_at',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='_updated_at',
            new_name='updated_at',
        ),
        migrations.RenameField(
            model_name='userprofile',
            old_name='_created_at',
            new_name='created_at',
        ),
        migrations.RenameField(
            model_name='userprofile',
            old_name='_updated_at',
            new_name='updated_at',
        ),
    ]
