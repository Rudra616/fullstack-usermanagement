from rest_framework import serializers
from .models import State, District, User

class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = '__all__'

class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = '__all__'

class UserSerilaizer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, min_length=6, required=True)
    phoneNumber = serializers.IntegerField(required=True)
    address = serializers.CharField(required=True)

    state = StateSerializer(read_only=True)
    district = DistrictSerializer(read_only=True)

    state_id = serializers.PrimaryKeyRelatedField(
        queryset=State.objects.all(),
        source='state',
        write_only=True,
        required=True,
        allow_null=False
    )
    district_id = serializers.PrimaryKeyRelatedField(
        queryset=District.objects.all(),
        source='district',
        write_only=True,
        required=True,
        allow_null=False
    )

    date_of_birth = serializers.DateField(
        format='%Y-%m-%d',
        input_formats=['%Y-%m-%d'],
        required=False  # change to True if you want to make it required
    )

    class Meta:
        model = User
        fields = [
            'first_name', 'last_name', 'username', 'password', 'phoneNumber',
            'email', 'address', 'state', 'district', 'state_id', 'district_id',
            'date_of_birth', 'email_verification_token'
        ]

    # def validate_email(self, value):
    #     if User.objects.filter(email=value).exists():
    #         raise serializers.ValidationError("Email already exists.")
    #     return value

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists.")
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        user.refresh_from_db()
        return user
