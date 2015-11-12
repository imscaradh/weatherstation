from django import forms

CHOICES = (('green', 'Green'),
           ('blue', 'Blau'),
           ('red', 'Rot'),
           ('black', 'Schwarz'))


class SettingsForm(forms.Form):
    outTemp = forms.BooleanField(required=False, label='Out temp')
    barometer = forms.BooleanField(required=False, label='Barometer')
    rainRate = forms.BooleanField(required=False, label='Rain rate')
    color = forms.ChoiceField(choices=CHOICES, widget=forms.RadioSelect(), required=False)
