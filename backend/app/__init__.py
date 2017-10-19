from flask import Flask

from flask_cors import CORS
from flask_restful import Api

app = Flask(__name__)

# Configuration of application, see configuration.py, choose one and uncomment.
# app.config.from_object('configuration.ProductionConfig')
app.config.from_object('app.configuration.DevelopmentConfig')
# app.config.from_object('configuration.TestingConfig')

from app.models import init

init()

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

from app.api import WeatherHistory, WeatherLive

api = Api(app, prefix="/api")
api.add_resource(WeatherHistory, '/weather/history')
api.add_resource(WeatherLive, '/weather/live')
