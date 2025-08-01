from rest_framework import serializers
from .models import *

class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = '__all__'

class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = '__all__'

class UserSerilaizer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['firstName','lastName','userName','password','phoneNumber','email','address','state','district','state_id','district_id','dateOfBirth','email_verification_token',]
    password = serializers.CharField(write_only=True)
    state = StateSerializer(read_only=True)
    district = DistrictSerializer(read_only=True)
    state_id = serializers.PrimaryKeyRelatedField(queryset=State.objects.all(), source='state', write_only=True)
    district_id = serializers.PrimaryKeyRelatedField(queryset=District.objects.all(), source='district', write_only=True)
    dateOfBirth = serializers.DateField(format='%Y-%m-%d', input_formats=['%Y-%m-%d'])


    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)  # 🔐 hashes the password
        user.save()
        return user