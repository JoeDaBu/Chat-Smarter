from django.db import models
import uuid


class RuneResult(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False)
    key = models.CharField(max_length=250)
    result = models.CharField(max_length=250)

class Trip(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False)
    time = models.TimeField()
    location = models.CharField(max_length=250)