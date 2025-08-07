from django.urls import path, include
from .views import userListCrateGenric,StateListView,DistrictListView  ,ProtectedView,UpdateProfileView
import rest_framework_simplejwt

from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

urlpatterns = [
    path('users/',userListCrateGenric.as_view()),
    path('states/', StateListView.as_view()),
    path('districts/', DistrictListView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('protected-view/',ProtectedView.as_view()),
    path('update-profile/', UpdateProfileView.as_view(), name='update-profile'),

    path('users/me/', UpdateProfileView.as_view(), name='user-profile'),
    path('admin-deshbord/', userListCrateGenric.as_view(), name='admin-dashboard'),
]
