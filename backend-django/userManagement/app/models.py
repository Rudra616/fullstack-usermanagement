from django.db import models
import uuid
# Create your models here.
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser

class State(models.Model):
    name = models.CharField(max_length=50)
    def __str__(self):
        return self.name

class District(models.Model):
    name=models.CharField(max_length=50)
    state = models.ForeignKey(State,on_delete=models.CASCADE)
    def __str__(self):
        return self.name


class User(AbstractUser):
    phoneNumber = models.BigIntegerField(null=False,blank=True,default='3383274')
    date_of_birth = models.DateField(null=True,blank=True)
    role = models.CharField(max_length=50, default='user')
    is_varified = models.BooleanField(default=False)
    email_verification_token = models.UUIDField(default=uuid.uuid4, blank=True)
    address = models.TextField()
    state = models.ForeignKey('State', on_delete=models.SET_NULL,null=True , blank=True)
    district = models.ForeignKey('District', on_delete=models.SET_NULL, null=True, blank=True)