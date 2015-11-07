from django.shortcuts import render_to_response, redirect
from django.template import RequestContext
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view
from chartit import DataPool, Chart
import time
from datetime import datetime
from .models import getDayByFields, Profile
from .serializers import WeatherdataTransformer
from forms import SettingsForm

visible = ['outTemp']


@login_required(login_url='/app/login')
def chartview(request):
    try:
        request.user.profile
    except:
        init_profile = Profile()
        init_profile.user = request.user
        request.user.profile.settings = {
            'config': {'outTemp': True, 'barometer': False, 'rainRate': True},
            'color': 'black',
        }
        request.user.profile.save()

    user_settings = request.user.profile.settings

    initial_values = dict(user_settings['config'])
    initial_values['color'] = user_settings['color']
    field_form = SettingsForm(initial_values)

    daily_chart = get_chart(user_settings['config'], '%d.%m %H:00')
    monthly_chart = get_chart(user_settings['config'], '%d.%m 00:00')
    return render_to_response(
        'app/index.html',
        {
            'charts': [daily_chart, monthly_chart],
            'field_config': field_form,
            'color': user_settings['color'],
        },
        context_instance=RequestContext(request)
    )


def get_chart(field_config, time_query):
    terms = [('time', lambda d: time.mktime(time.strptime(d, "%Y-%m-%d %H")))]
    terms.extend(field_config)

    fieldList = []
    counter = 0
    for name in field_config:
        if field_config.get(name):
            fieldList.append(
                {'options': {'type': 'area',
                             'xAxis': 0,
                             'yAxis': counter,
                             'visible': (name in visible)},
                 'terms': {'time': [name]}}
            )
            counter += 1

    ds = DataPool(series=[{'options': {
        'source': getDayByFields(field_config)},
        'terms': terms}])

    cht = Chart(
        datasource=ds,
        series_options=fieldList,
        chart_options={'title': {'text': 'Temperature'},
                       'xAxis': {'title': {'text': 'Date'}}},
        x_sortf_mapf_mts=(None, lambda i: datetime.fromtimestamp(i).strftime("%d.%m %H:00"), False))
    return cht


def save_settings(request):
    if request.method == 'POST':
        form = SettingsForm(request.POST)
        form.is_valid()
        form_data = form.__dict__.get('cleaned_data')
        request.user.profile.settings['color'] = form_data['color']
        form_data.pop('color')
        request.user.profile.settings['config'] = form_data
        request.user.profile.save()
    return redirect('/app/')


@api_view(['GET', 'POST'])
def weatherdata(request):
    json = request.data
    current = json.get("stats").get("current")
    WeatherdataTransformer(data=current)
