from django.db import models
from django.contrib.auth.models import AbstractUser

class MyUser(AbstractUser):
    profile_image = models.ImageField(upload_to='profile_image/', blank=True, null=True)

    def __str__(self):
        return self.username

class Appointment(models.Model):
    title = models.CharField("title of appointment", max_length=50)
    description = models.TextField("description of appointment")
    date = models.DateTimeField("date and time of appointment", auto_now=False, auto_now_add=False)
    user = models.ForeignKey("MyUser", verbose_name="related user", on_delete=models.CASCADE)
    # type = ()
    # countdown = (boolean)

    def __str__(self):
        return self.title
