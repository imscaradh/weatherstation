from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view
from chartit import DataPool, Chart
import time
from datetime import datetime
from .models import getDayByFields
from .serializers import WeatherdataTransformer
from forms import SettingsForm


@login_required(login_url='/app/login')
def chartview(request):
    fields = request.user.profile.settings
    form = SettingsForm(fields)

    terms = [('time', lambda d: time.mktime(time.strptime(d, "%Y-%m-%d %H")))]
    terms.extend(fields)

    fieldList = []
    counter = 0
    for name in fields:
        if fields.get(name):
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

    return render_to_response('app/index.html', {'weatherchart': cht, 'settings_form': form}, context_instance=RequestContext(request))


def update_settings(request):
    if request.method == 'POST':
        form = SettingsForm(request.POST)
        form.is_valid()
        request.user.profile.settings = form.__dict__.get('cleaned_data')
        request.user.profile.save()
    return chartview(request)


@api_view(['GET', 'POST'])
def weatherdata(request):
    json = request.data
    current = json.get("stats").get("current")
    WeatherdataTransformer(data=current)
