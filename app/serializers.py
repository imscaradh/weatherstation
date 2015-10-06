from django.core import serializers
from .models import Weatherdata
from StringIO import StringIO

class WeatherdataTransformer():
     def __init__(self, data):
         obj = Weatherdata(**data)
         obj.save()
