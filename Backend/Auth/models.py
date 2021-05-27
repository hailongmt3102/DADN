
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.validators import MaxValueValidator, MinValueValidator
from Api.models import Farm

class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, username, user_first_name, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, username, user_first_name, password, **other_fields)

    def create_user(self, email, username, user_first_name, password, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email, username=username,
                          user_first_name=user_first_name, **other_fields)
        user.set_password(password)
        user.save()
        return user


class MyUser(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(_('email address'), unique=True)

    username = models.CharField(max_length=150, unique=True)

    join_date = models.DateTimeField(default=timezone.now)

    about = models.TextField(_(
        'about'), max_length=500, blank=True)

    is_staff = models.BooleanField(default=False)

    is_active = models.BooleanField(default=False)

    user_first_name = models.CharField(max_length=50, default="")

    user_last_name = models.CharField(max_length=50, default="")

    user_type = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(2)],
        default = 1
    )

    user_address = models.CharField(max_length=50, default="")

    user_farm = models.ForeignKey(
        to="Api.Farm",
        related_name='farm_of_user',
        on_delete=models.CASCADE,
        null=True
    )
    
    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'user_first_name']

    def __str__(self):
        return self.username



