from django.conf.urls import url, include
from django.contrib.auth.views import login
from django.contrib.auth.views import logout
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    url(r'^$', views.chartview),
    url(r'^login/$', login, {'template_name': 'app/login.html'}),
    url(r'^logout/$', logout, {'template_name': 'app/logout.html'}),
    url(r'^map/$', TemplateView.as_view(template_name='app/map.html')),
    url(r'^weatherdata/$', views.weatherdata),
    url(r'^savesettings/$', views.save_settings),
    url(r'^i18n/', include('django.conf.urls.i18n')),
]
