import logging
import pathlib
import sys
from pathlib import Path

# Adds local modules to PYTHONPATH
sys.path.insert(0, str(pathlib.Path(__file__).parents[1]))

from app.api import WeatherHistory, WeatherLive
from app.models import init_db
from flask import Flask, Blueprint
from flask_cors import CORS
from flask_restful import Api


def create_app(system):
    app = Flask(__name__)

    # Setup configuration
    app.config.from_pyfile('../config/{}.cfg'.format(system))
    app.config["BASE_PATH"] = str(Path(__file__).parents[1])
    app.logger.setLevel(logging.NOTSET)

    # Setup SQLAlchemy database
    init_db(app)

    # Setup FLask-RESTful API
    bp_api = Blueprint('api', __name__, url_prefix='/api')
    api = Api(bp_api)
    api.add_resource(WeatherHistory, '/weather/history')
    api.add_resource(WeatherLive, '/weather/live')
    app.register_blueprint(bp_api)

    # Configure CORS for REST API
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    return app


if __name__ == '__main__':
    if len(sys.argv) == 1:
        exit(-1)

    # Setup Flask app
    app = create_app(sys.argv[1])
    app.run(host=app.config["HOST"], port=app.config["PORT"])
