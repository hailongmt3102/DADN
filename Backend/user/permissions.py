from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.request import Request
from django.urls import resolve

class UserPermissions(IsAuthenticated):
    def has_permission(self, request:Request, view):
        try:
            url_name = resolve(request.path_info).url_name
        except Exception:
            url_name = None
        if url_name == "create_user":
            return True
        else:
            return super().has_permission(request, view)

    def has_object_permission(self, request, view, obj):
        if request.user == obj:
            return True


