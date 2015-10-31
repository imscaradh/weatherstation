from django.db import models
from django.db.models import Avg
from django.contrib.auth.models import User
from picklefield.fields import PickledObjectField


class Weatherdata(models.Model):
    time = models.DateTimeField(auto_now_add=True, primary_key=True)
    outTemp = models.FloatField()
    windchill = models.FloatField()
    heatIndex = models.FloatField()
    dewpoint = models.FloatField()
    humidity = models.FloatField()
    insideHumidity = models.FloatField()
    barometer = models.FloatField()
    barometerTrendDelta = models.FloatField()
    barometerTrendData = models.FloatField()
    windSpeed = models.FloatField()
    windDir = models.FloatField()
    windDirText = models.FloatField()
    windGust = models.FloatField()
    windGustDir = models.FloatField()
    rainRate = models.FloatField()
    insideTemp = models.FloatField()


def getDayByFields(fieldList):
    select_data = {"time": """strftime('%%Y-%%m-%%d %%H', time)"""}
    annotationList = {}
    for field in fieldList:
        annotationList[field] = Avg(field)

    results = Weatherdata.objects.extra(select=select_data).values('time').annotate(**annotationList)[:24]
    return results


class Profile(models.Model):
    user = models.OneToOneField(User)
    settings = PickledObjectField()
