from django.db import models


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
