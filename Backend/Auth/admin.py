from django.contrib import admin
from .models import MyUser
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from django import forms
from django.db import models
from .models import MyUser


@admin.register(MyUser)
class AdminSensorData(admin.ModelAdmin):
    pass
# class UserAdminConfig(UserAdmin):
#     model = MyUser
#     search_fields = ('email', 'username', 'user_first_name',)
#     list_filter = ('email', 'username', 'user_first_name',
#                    'is_active', 'is_staff')
#     ordering = ('-join_date',)
#     list_display = (
#         'id',
#         'email',
#         'username',
#         'user_first_name',
#         'user_last_name',
#         'is_active',
#         'is_staff',
#         'join_date',
#         'user_type',
#         'user_address',
#         'user_farm',
#     )
#     fieldsets = (
#         (None, {'fields': ('email', 'username', 'user_first_name',)}),
#         ('Permissions', {'fields': ('is_staff', 'is_active')}),
#         ('Personal', {'fields': ('about',)}),
#     )
#     formfield_overrides = {
#         models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
#     }
#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': (
#                 'email',
#                 'username',
#                 'user_first_name',
#                 'user_last_name',
#                 'password1',
#                 'password2',
#                 'is_active',
#                 'is_staff',
#                 'user_type',
#                 'user_address',
#                 'user_farm',
#             )}
#          ),
#     )


# admin.site.register(MyUser, UserAdminConfig)
