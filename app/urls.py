from django.conf.urls import url

from . import views

urlpatterns = [
        url(r'^$', views.chartview),
        url(r'^weatherdata/$', views.weatherdata),
]
