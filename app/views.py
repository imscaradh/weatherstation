from django.shortcuts import get_object_or_404, render, render_to_response
from django.http import HttpResponseRedirect
from django.template import RequestContext
from django.core.urlresolvers import reverse
from django.views import generic
from rest_framework.decorators import api_view
from chartit import DataPool, Chart

from .models import Weatherdata
from .serializers import WeatherdataSerializer

def chartview(request):
    #Step 1: Create a DataPool with the data we want to retrieve.
    weatherdata = \
        DataPool(
           series=
            [{'options': {
               'source': Weatherdata.objects.all()},
              'terms': [
                'time',
                'windSpeed',
                'outTemp']}
             ])

    #Step 2: Create the Chart object
    cht = Chart(
            datasource = weatherdata,
            series_options =
              [{'options':{
                  'type': 'line',
                  'stacking': False},
                'terms':{
                  'time': [
                    'windSpeed',
                    'outTemp']
                  }}],
            chart_options =
              {'title': {
                   'text': 'Weather Data of Boston and Houston'},
               'xAxis': {
                    'title': {
                       'text': 'Month number'}}})

    #Step 3: Send the chart object to the template.
    return render_to_response('app/index.html',{'weatherchart': cht,'plain_data': Weatherdata.objects.all()},context_instance=RequestContext(request))


@api_view(['GET', 'POST'])
def weatherdata(request):
    json = request.data
    current = json.get("stats").get("current")
    deserialized = WeatherdataSerializer(data=current)
    if deserialized.is_valid():
       modelData = deserialized.save()
