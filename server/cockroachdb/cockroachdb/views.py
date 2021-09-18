from django.http import JsonResponse, HttpResponse
from django.utils.decorators import method_decorator
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt
from django.db import Error, IntegrityError
from django.db.transaction import atomic
from psycopg2 import errorcodes
import json
import sys
import time

from .models import *

# Warning: Do not use retry_on_exception in an inner nested transaction.


def retry_on_exception(num_retries=3, on_failure=HttpResponse(status=500), delay_=0.5, backoff_=1.5):
    def retry(view):
        def wrapper(*args, **kwargs):
            delay = delay_
            for i in range(num_retries):
                try:
                    return view(*args, **kwargs)
                except IntegrityError as ex:
                    if i == num_retries - 1:
                        return on_failure
                    elif getattr(ex.__cause__, 'pgcode', '') == errorcodes.SERIALIZATION_FAILURE:
                        time.sleep(delay)
                        delay *= backoff_
                except Error as ex:
                    return on_failure
        return wrapper
    return retry


class PingView(View):
    def get(self, request, *args, **kwargs):
        return HttpResponse("python/django", status=200)


@method_decorator(csrf_exempt, name='dispatch')
class RuneResultView(View):
    def get(self, request, id=None, *args, **kwargs):
        if id is None:
            runeResults = list(RuneResult.objects.values())
        else:
            runeResults = list(RuneResult.objects.filter(id=id).values())
        return JsonResponse(runeResults, safe=False)

    @retry_on_exception(3)
    @atomic
    def post(self, request, *args, **kwargs):
        form_data = json.loads(request.body.decode())
        key, result = form_data['key'], form_data['result']
        c = RuneResult(key=key, result=result)
        c.save()
        return HttpResponse(status=200)

@method_decorator(csrf_exempt, name='dispatch')
class TripView(View):
    def get(self, request, id=None, *args, **kwargs):
        if id is None:
            trips = list(Trip.objects.values())
        else:
            trips = list(Trip.objects.filter(id=id).values())
        return JsonResponse(trips, safe=False)

    @retry_on_exception(3)
    @atomic
    def post(self, request, *args, **kwargs):
        form_data = json.loads(request.body.decode())
        triptime, location = form_data['time'], form_data['location']
        c = Trip(time=triptime, location=location)
        c.save()
        return HttpResponse(status=200)