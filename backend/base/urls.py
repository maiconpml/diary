from django.urls import path

from .views import CustomTokenObtainPairView, CustomRefreshTokenView, logout, is_authenticated, register
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomRefreshTokenView.as_view(), name='token_refresh'),
    path('logout/', logout),
    path('authenticated/', is_authenticated),
    path('register/', register)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)