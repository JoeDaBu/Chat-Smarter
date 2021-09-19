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
    time = models.CharField(max_length=250)
    location = models.CharField(max_length=250)
    sender = models.CharField(max_length=250)
    receiver = models.CharField(max_length=250)
