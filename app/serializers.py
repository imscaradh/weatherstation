from rest_framework import serializers

from .models import Weatherdata

class WeatherdataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weatherdata
