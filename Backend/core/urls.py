
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin', admin.site.urls),
    # path('oauth/', include('oauth.urls')),
    path('api', include(
        [
            path("/user", include("user.urls")),
            path('/farms', include('farm.urls')),
            path('/farms/fields', include('field.urls')),
            path('/productions', include('product.urls')),
        ]
    )),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
