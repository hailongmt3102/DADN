from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.permissions import BasePermission, SAFE_METHODS
from .mylog import my_log

class testAuth(BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return request.user.user_type == 0

    def has_permission(self, request, view):
        my_log(request.META)
        if request.method in SAFE_METHODS:
            return True
        return request.user.user_type == 0


class test(APIView):
    permission_classes = [testAuth,permissions.IsAuthenticated]

    def get(self, request, *args, **kargs):

        return Response({}, status.HTTP_200_OK)
