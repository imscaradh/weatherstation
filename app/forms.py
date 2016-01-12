from django import forms
from django.utils.translation import ugettext_lazy as _

COLORS = (
    ('green', _('Green')),
    ('blue', _('Blue')),
    ('red', _('Red')),
    ('black', _('Black'))
)

FIELDS = (
    ("outTemp", _('Out temp')),
    ("barometer", _('Barometer')),
    ("rainRate", _('Rain rate')),
    ("humidity", _('Humidity')),
    ("windSpeed", _('Wind speed')),
    ("insideTemp", _('Inside temp')),
    ("windchill", _('Wind chill')),
    ("insideHumidity", _('Inside humidity'))
)


class SettingsForm(forms.Form):
    fields = forms.MultipleChoiceField(widget=forms.SelectMultiple, required=False, choices=FIELDS,
                                       label=_('Field configuration'))
    color = forms.ChoiceField(choices=COLORS, widget=forms.RadioSelect(), required=False, label=_('Color'))
