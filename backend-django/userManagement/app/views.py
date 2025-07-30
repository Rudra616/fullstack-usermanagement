from django.shortcuts import render

# Create your views here.
from .serilaizers import UserSerilaizer
from .models import User
from rest_framework import generics


class userListCrateGenric(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerilaizer 