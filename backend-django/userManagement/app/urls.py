from django.urls import path, include
from .views import userListCrateGenric,StateListView,DistrictListView

urlpatterns = [
    path('users/',userListCrateGenric.as_view()),
    path('states/', StateListView.as_view()),
    path('districts/', DistrictListView.as_view()),
    
]
