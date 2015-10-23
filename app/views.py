from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view
from chartit import DataPool, Chart
import time
from datetime import datetime
from .models import getDayByFields
from .serializers import WeatherdataTransformer


@login_required(login_url='/app/login')
def chartview(request):
    fields = ['outTemp', 'barometer', 'rainRate']
    terms = [('time', lambda d: time.mktime(time.strptime(d, "%Y-%m-%d %H")))]
    terms.extend(fields)

    fieldList = []
    counter = 0
    for name in fields:
        fieldList.append(
            {'options': {'type': 'area', 'xAxis': 0, 'yAxis': counter}, 'terms': {'time': [name]}}
        )
        counter = counter + 1

    ds = DataPool(series=[{'options': {
        'source': getDayByFields(fields)},
        'terms': terms}])

    cht = Chart(
        datasource=ds,
        series_options=fieldList,
        chart_options={'title': {'text': 'Temperature'}, 'xAxis': {'title': {'text': 'Date'}}},
        x_sortf_mapf_mts=(None, lambda i: datetime.fromtimestamp(i).strftime("%d.%m %H:00"), False))

    return render_to_response('app/index.html', {'weatherchart': cht}, context_instance=RequestContext(request))


@api_view(['GET', 'POST'])
def weatherdata(request):
    json = request.data
    current = json.get("stats").get("current")
    WeatherdataTransformer(data=current)
