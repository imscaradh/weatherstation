from django import forms
from django.utils.translation import ugettext_lazy as _

CHOICES = (('green', _('Green')),
           ('blue', _('Blue')),
           ('red', _('Red')),
           ('black', _('Black')))


class SettingsForm(forms.Form):
    outTemp = forms.BooleanField(required=False, label=_('Out temp'))
    barometer = forms.BooleanField(required=False, label=_('Barometer'))
    rainRate = forms.BooleanField(required=False, label=_('Rain rate'))
    color = forms.ChoiceField(choices=CHOICES, widget=forms.RadioSelect(), required=False, label=_('Color'))
