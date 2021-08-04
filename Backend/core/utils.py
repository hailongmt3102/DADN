from django.http import JsonResponse
import time
from rest_framework.views import exception_handler
from rest_framework import status
from django.core.mail import send_mail


def my_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    # raise (exc)
    response = exception_handler(exc, context)
    print(exc)
    # raise exc
    if response is not None:

        if response.status_code == status.HTTP_401_UNAUTHORIZED:

            return response_gen(
                message="UNAUTHORIZED",
                status=status.HTTP_401_UNAUTHORIZED,
                data=response.data
            )

        if response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED:

            return response_gen(
                message="Method not allow",
                status=status.HTTP_401_UNAUTHORIZED
            )

        else:
            return response_gen(
                status=500,
                message="dont conttact me for support",
                data={"error_message": str(exc)}
            )

    else:
        return response_gen(status=500, message="dont conttact me for support", data={"error_message": str(exc)})
    


def response_gen(data=None,  message="", status=200, errorCode=200):
    return JsonResponse({
        "errorCode": 0 if status == 200 else status,
        "message": message,
        "current_time": int(time.time()),
        "data": data,
    }, status=status)


class Email():

    def __init__(self, subject, body, to, *args, **kargs):
        self.subject = subject
        self.body = body
        self.to = to

    def send(self):
        return send_mail(
            subject=self.subject,
            message=self.body,
            recipient_list=self.to,
            from_email="noreply@email.com"
        )
