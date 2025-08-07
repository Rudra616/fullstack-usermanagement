from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.
from .serilaizers import *
from .models import User
from rest_framework import generics,filters
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateAPIView



class StateListView(generics.ListCreateAPIView):
    queryset = State.objects.all()
    serializer_class = StateSerializer

class DistrictListView(generics.ListCreateAPIView):
    serializer_class = DistrictSerializer

    def get_queryset(self):
        state_id = self.request.GET.get("state")
        return District.objects.filter(state_id=state_id)


class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        response = {
            'status':'Request was permitted'
        }
        return Response(response)


class UpdateProfileView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerilaizer

    def get_object(self):
        return self.request.user  # Return the logged-in user
    

class userListCrateGenric(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerilaizer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['state', 'district', 'role']
    search_fields = ['username', 'first_name', 'last_name', 'email', 'phoneNumber']
    ordering_fields = ['username', 'email', 'date_of_birth']
    
    def get_queryset(self):
        queryset = super().get_queryset()
        # You can add any additional filtering logic here if needed
        return queryset
    
    def list(self, request, *args, **kwargs):
        # Override list to return paginated response
        queryset = self.filter_queryset(self.get_queryset())
        
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
            
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)