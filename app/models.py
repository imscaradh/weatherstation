from django.db import models

# Create your models here.
class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

class Choice(models.Model):
    question = models.ForeignKey(Question)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)


class Weatherdata(models.Model):
    time = models.DateTimeField(auto_now_add=True,primary_key=True)
    outTemp = models.FloatField(max_length=100)
    windchill = models.CharField(max_length=100)
    heatIndex = models.CharField(max_length=100)
    dewpoint = models.CharField(max_length=100)
    humidity = models.CharField(max_length=100)
    insideHumidity = models.CharField(max_length=100)
    barometer = models.CharField(max_length=100)
    barometerTrendDelta = models.CharField(max_length=100)
    barometerTrendData = models.CharField(max_length=100)
    windSpeed = models.FloatField(max_length=100)
    windDir = models.CharField(max_length=100)
    windDirText = models.CharField(max_length=100)
    windGust = models.CharField(max_length=100)
    windGustDir = models.CharField(max_length=100)
    rainRate = models.CharField(max_length=100)
    insideTemp = models.CharField(max_length=100)
