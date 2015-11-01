from django.conf.urls import url
from django.contrib.auth.views import login
from django.contrib.auth.views import logout

from . import views

urlpatterns = [
    url(r'^$', views.chartview),
    url(r'^login/$', login, {'template_name': 'app/login.html'}),
    url(r'^logout/$', logout, {'template_name': 'app/logout.html'}),
    url(r'^weatherdata/$', views.weatherdata),
    url(r'^savesettings/$', views.save_settings),
]
