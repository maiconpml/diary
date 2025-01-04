from django.db import models
from django.contrib.auth.models import AbstractUser

class MyUser(AbstractUser):
    profile_image = models.ImageField(upload_to='profile_image/', blank=True, null=True)

    def __str__(self):
        return self.username
