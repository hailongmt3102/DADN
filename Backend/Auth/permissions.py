from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly, BasePermission, IsAdminUser, DjangoModelPermissions


class is_admin(BasePermission):
    message = '.'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return request.user.user_type == 2

    def has_permission(self, request, view):
        return request.user.user_type == 0


class is_owner(BasePermission):
    message = '.'

    def has_permission(self, request, view):
        return request.user.user_type == 1


class is_staff(BasePermission):
    message = '.'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return request.user.user_type == 2

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user.user_type == 2
