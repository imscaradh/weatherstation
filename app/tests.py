import datetime

from django.utils import timezone
from django.test import TestCase

from .models import Question


class QuestionMethodTests(TestCase):
    def was_published_recently(self):
        now = timezone.now()
        return now - datetime.timedelta(days=1) <= self.pub_date <= now
