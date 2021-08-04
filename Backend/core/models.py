from django.db import models
import uuid as UUID


class ABCmodel(models.Model):
    created_at = models.DateTimeField(auto_now = False, auto_now_add=True, db_column="created_at")
    updated_at = models.DateTimeField(auto_now=True, db_column="updated_at",auto_now_add=False)

    uuid = models.UUIDField(
        unique=True,
        default=UUID.uuid4,
        editable=False,
        auto_created=True
    )

    # @property
    # def created_at(self):
    #     return int(self._created_at.timestamp())

    # @property
    # def updated_at(self):
    #     return int(self._updated_at.timestamp())

    # @created_at.setter
    # def set_created_at(self, value):
    #     self._created_at = value

    # @updated_at.setter
    # def set_updated_at(self, value):
    #     self._updated_at = value

    class Meta:
        abstract = True
