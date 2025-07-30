from django.urls import path, include
from .views import userListCrateGenric

urlpatterns = [
    path('users/',userListCrateGenric.as_view())
]
