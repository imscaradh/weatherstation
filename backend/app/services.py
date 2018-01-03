from app.models import Weather, db
from sqlalchemy import desc, func


def get_weather_history(pages=30):
    weather_history = []

    fields = ["timestamp", "inTemp", "outTemp", "inHumidity", "outHumidity", "rain", "windDir", "windSpeed", "pressure"]

    query = db.session.query(
        Weather.timestamp,
        *[func.avg(getattr(Weather, f)) for f in fields[1:]]
    ).group_by(func.strftime("%Y-%m-%d %H", Weather.timestamp)) \
        .order_by(desc(Weather.timestamp)) \
        .limit(pages)

    for entry in query:
        dict_obj = {}
        for i, r in enumerate(entry):
            dict_obj[fields[i]] = str(r)

        weather_history.append(dict_obj)

    return weather_history


def get_weather_current():
    result = get_weather_history(pages=1)
    return result[0] if len(result) > 0 else []
