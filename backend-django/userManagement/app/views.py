from django.shortcuts import render

# Create your views here.
from .serilaizers import *
from .models import User
from rest_framework import generics


class userListCrateGenric(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerilaizer 


class StateListView(generics.ListCreateAPIView):
    queryset = State.objects.all()
    serializer_class = StateSerializer

class DistrictListView(generics.ListCreateAPIView):
    serializer_class = DistrictSerializer

    def get_queryset(self):
        state_id = self.request.GET.get("state")
        return District.objects.filter(state_id=state_id)
