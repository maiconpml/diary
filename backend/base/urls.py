from django.urls import path

from .views import CustomTokenObtainPairView, CustomRefreshTokenView, logout, is_authenticated, register, create_appointment, update_appointment, get_appointments,  delete_appointment, get_appointments_by_date
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomRefreshTokenView.as_view(), name='token_refresh'),
    path('logout/', logout),
    path('authenticated/', is_authenticated),
    path('register/', register),
    path('appointments/', get_appointments),
    path('appointments/create/', create_appointment),
    path('appointments/update/<int:pk>', update_appointment),
    path('appointments/delete/<int:pk>', delete_appointment),
    path('appointments/<int:year>', get_appointments_by_date),
    path('appointments/<int:year>/<int:month>', get_appointments_by_date),
    path('appointments/<int:year>/<int:month>/<int:day>', get_appointments_by_date),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)