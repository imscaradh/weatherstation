from django.shortcuts import render_to_response
from rest_framework.decorators import api_view
from chartit import DataPool, Chart
import time
from datetime import datetime
from .models import Weatherdata
from .serializers import WeatherdataTransformer


def chartview(request):
    ds = DataPool(series=[{'options': {
                  'source': Weatherdata.objects.order_by('-time')[:20]},
        'terms': [('time', lambda d: time.mktime(d.timetuple())), 'outTemp']}])

    cht = Chart(
        datasource=ds,
        series_options=[{'options': {'type': 'line', 'stacking': False},
                         'terms': {'time': ['outTemp']}}],
        chart_options={'title': {'text': 'Temperature'},
                       'xAxis': {'title': {'text': 'Date'}}},
        x_sortf_mapf_mts=(None,
                          lambda i: datetime.fromtimestamp(i).strftime(
                              "%d.%m.%y, %H:%M"), False))

    return render_to_response('app/index.html',
                              {'plain_data': Weatherdata.objects.all(),
                               'weatherchart': cht})


@api_view(['GET', 'POST'])
def weatherdata(request):
    json = request.data
    current = json.get("stats").get("current")
    WeatherdataTransformer(data=current)
