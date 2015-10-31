from django import forms


class SettingsForm(forms.Form):
    outTemp = forms.BooleanField(required=False, label='Out temp')
    barometer = forms.BooleanField(required=False, label='Barometer')
    rainRate = forms.BooleanField(required=False, label='Rain rate')
