from flask import logging
from flask_sqlalchemy import SQLAlchemy
from passlib.apps import custom_app_context as pwd_context
from sqlalchemy import desc

logger = logging.getLogger(__name__)

db = SQLAlchemy()  # flask-sqlalchemy


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), index=True)
    password_hash = db.Column(db.String(128))

    def hash_password(self, password):
        self.password_hash = pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)


class Weather(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime(timezone=True))
    pressure = db.Column(db.Float)
    inTemp = db.Column(db.Float)
    outTemp = db.Column(db.Float)
    windDir = db.Column(db.Float)
    windSpeed = db.Column(db.Float)
    outHumidity = db.Column(db.Float)
    inHumidity = db.Column(db.Float)
    rain = db.Column(db.Float)

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}

    def save(self):
        db.session.add(self)
        db.session.commit()


def get_weather_history(pages=10):
    weather_history = []

    query = db.session.query(Weather).order_by(desc(Weather.timestamp)).limit(pages)
    for entry in query:
        weather_history.append(entry.as_dict())

    # print(weather_history)
    return weather_history


def get_weather_current():
    result = get_weather_history(pages=1)
    return result[0] if len(result) > 0 else []


def setup_api_user():
    username = "weatherstation"
    password = "umevohvoori2zaew2choKaeshooPho"
    if User.query.filter_by(username=username).first() is not None:
        return
    user = User(username=username)
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()
    logger.info("User created")


def init_db(app):
    db.app = app
    db.init_app(app)
    db.create_all()
    setup_api_user()

    if app.config["SQLALCHEMY_BOOTSTRAP_DATA"]:
        import_from_json()

    return db


def import_from_json():
    pass
