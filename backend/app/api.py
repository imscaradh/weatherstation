import json
from datetime import datetime

from app.models import get_weather_history, get_weather_current, Weather, add, User
from flask import request, g
from flask_httpauth import HTTPBasicAuth
from flask_restful import Resource

auth = HTTPBasicAuth()


class WeatherHistory(Resource):
    def get(self):
        return get_weather_history()

    @auth.login_required
    def put(self):
        data = json.loads(request.get_data())

        entry = Weather()
        entry.timestamp = datetime.fromtimestamp(data["dateTime"])
        entry.pressure = data["pressure"]
        entry.inTemp = data["inTemp"]
        entry.outTemp = data["outTemp"]
        entry.windDir = data["windDir"]
        entry.windSpeed = data["windSpeed"]
        entry.outHumidity = data["outHumidity"]
        entry.inHumidity = data["inHumidity"]
        entry.rain = 0 if data["rain"] is None else data["rain"]
        add(entry)


class WeatherLive(Resource):
    def get(self):
        return get_weather_current()


@auth.verify_password
def verify_password(username, password):
    user = User.query.filter_by(username=username).first()
    if not user or not user.verify_password(password):
        return False
    g.user = user
    return True
