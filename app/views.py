from django.shortcuts import render_to_response
from rest_framework.decorators import api_view
from chartit import DataPool, Chart
import time
from datetime import datetime
from .models import Weatherdata, getLastDayByCommonFields
from .serializers import WeatherdataTransformer


def chartview(request):
    ds = DataPool(series=[{'options': {
        'source': getLastDayByCommonFields()},
        'terms': [('time', lambda d: time.mktime(time.strptime(d, "%Y-%m-%d %H"))), 'outTemp', 'barometer', 'rainRate']}])

    cht = Chart(
        datasource=ds,
        series_options=[
            {'options': {'type': 'line', 'xAxis': 0, 'yAxis': 0, 'zIndex': 1},
                'terms': {'time': ['outTemp']}},
            {'options': {'type': 'line', 'xAxis': 0, 'yAxis': 1},
                'terms': {'time': ['barometer']}},
            {'options': {'type': 'area', 'xAxis': 0, 'yAxis': 0},
                'terms': {'time': ['rainRate']}}],
        chart_options={'title': {'text': 'Temperature'}, 'xAxis': {'title': {'text': 'Date'}}},
        x_sortf_mapf_mts=(None, lambda i: datetime.fromtimestamp(i).strftime("%d.%m %H:00"), False))

    return render_to_response('app/index.html',
                              {'plain_data': Weatherdata.objects.all(),
                               'weatherchart': cht})


@api_view(['GET', 'POST'])
def weatherdata(request):
    json = request.data
    current = json.get("stats").get("current")
    WeatherdataTransformer(data=current)
