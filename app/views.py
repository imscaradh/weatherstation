from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.views import generic
from rest_framework.decorators import api_view

from .models import Question, Weatherdata
from .serializers import WeatherdataSerializer

class IndexView(generic.ListView):
    template_name = 'app/index.html'
    context_object_name = 'latest_question_list'

    def get_queryset(self):
        return Question.objects.order_by('-pub_date')[:5]

class DetailView(generic.DetailView):
    model = Question
    template_name = 'app/detail.html'

@api_view(['GET', 'POST'])
def weatherdata(request):
    json = request.data
    current = json.get("stats").get("current")
    deserialized = WeatherdataSerializer(data=current)
    import pdb; pdb.set_trace()
    if deserialized.is_valid():
        modelData = deserialized.save()
