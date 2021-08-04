from django.shortcuts import render
import time
from django.http import JsonResponse

# Create your views here.
def response_gen(data=None,  message="", status=200, errorCode=200):
    return JsonResponse({
        "errorCode": 0 if status == 200 else status,
        "message": message,
        "current_time": int(time.time()),
        "data": data,
    }, status=status)