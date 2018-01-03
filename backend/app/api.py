import base64
import json
from datetime import datetime

from app import models
from app.models import Weather, User, db
from app.services import get_weather_history, get_weather_current
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
        entry.save()


class WeatherLive(Resource):
    def get(self):
        return get_weather_current()


class Webcam(Resource):
    def get(self):
        img = db.session.query(models.Webcam) \
            .order_by(models.Webcam.timestamp.desc()) \
            .first()

        if img:
            return {'time': str(img.timestamp), 'img': base64.b64encode(img.data).decode('ascii')}


    @auth.login_required
    def put(self):
        entry = models.Webcam()
        entry.timestamp = datetime.now()
        entry.data = request.get_data()
        entry.save()

        if db.session.query(models.Webcam).count() > 20:
            db.session.query(models.Webcam) \
                .order_by(models.Webcam.timestamp.asc()) \
                .first() \
                .delete()


@auth.verify_password
def verify_password(username, password):
    user = User.query.filter_by(username=username).first()
    if not user or not user.verify_password(password):
        return False
    g.user = user
    return True
