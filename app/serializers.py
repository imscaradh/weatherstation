from .models import Weatherdata


class WeatherdataTransformer():

    def __init__(self, data):
        obj = Weatherdata(**data)
        obj.save()
