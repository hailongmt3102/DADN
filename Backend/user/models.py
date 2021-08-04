from core.models import ABCmodel
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.validators import MaxValueValidator, MinValueValidator


class AccountManager(BaseUserManager):

    def create_superuser(self, email, username, password, **other_fields):

        other_fields.setdefault('is_superuser', True)

        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, username,  password, **other_fields)

    def create_user(self, email, username,  password, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        other_fields.setdefault('is_staff', True)

        email = self.normalize_email(email)
        
        user = self.model(
            email=email,
            username=username,
            **other_fields
        )

        user.set_password(password)
        user.save()
        profile = UserProfile(user=user)
        profile.save()
        return user


class User(AbstractBaseUser, PermissionsMixin, ABCmodel):
    class Meta:
        db_table = "user"

    email = models.EmailField(_('email address'), unique=True)

    username = models.CharField(max_length=150, unique=True)

    is_staff = models.BooleanField(default = True)

    objects = AccountManager()

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['username']

    # @property
    # def farm(self):
    #     return self.profile.farm

    def __str__(self):
        return self.username


class UserProfile(ABCmodel):
    
    class Meta:
        db_table = "user_profile"

    first_name = models.CharField(max_length=50, default="")

    last_name = models.CharField(max_length=50, default="")

    address = models.CharField(max_length=50, default="")

    user = models.OneToOneField(
        to="User",
        related_name='profile',
        on_delete=models.CASCADE,
        null=True
    )

    @property
    def fullname(self):
        return self.last_name + self.first_name
