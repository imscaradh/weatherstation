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
    barometerTrendData = models.FloatField()
    windSpeed = models.FloatField()
    windDir = models.FloatField()
    windGust = models.FloatField()
    windGustDir = models.FloatField()
    rainRate = models.FloatField()
    insideTemp = models.FloatField()


def daterange_selection(field_list, date_format, count):
    date_format_esc = date_format.replace('%', '%%')
    select_data = {"time": "strftime('" + date_format_esc + "', time)"}
    annotation_list = {}
    for field in field_list:
        annotation_list[field] = Avg(field)
    results = Weatherdata.objects.extra(select=select_data).values('time').annotate(**annotation_list).order_by(
        '-time')[:count]
    return results


class Profile(models.Model):
    user = models.OneToOneField(User)
    settings = PickledObjectField()
