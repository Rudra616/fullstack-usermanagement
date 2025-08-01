from django.urls import path, include
from .views import userListCrateGenric,StateListView,DistrictListView 
import rest_framework_simplejwt

from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView 

urlpatterns = [
    path('users/',userListCrateGenric.as_view()),
    path('states/', StateListView.as_view()),
    path('districts/', DistrictListView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
