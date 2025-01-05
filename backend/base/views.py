from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializer import MyUserRegistrationSerializer, AppointmentSerializer, MyUserProfileSerializer
from .models import Appointment

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):

        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            access_token = tokens['access']
            refresh_token = tokens['refresh']

            res = Response()

            res.data = {'success':True}

            res.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

            res.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

            return res

        except:
            return Response({'success':False})
        
class CustomRefreshTokenView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')

            request.data['refresh'] = refresh_token

            response = super().post(request, *args, **kwargs)

            tokens = response.data
            access_token = tokens['access']

            res = Response()

            res.data = {'refreshed':True}

            res.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

            return res
        except:
            return Response({'refreshed':False})
        
@api_view(['POST'])
@permission_classes({IsAuthenticated})
def logout(request):
    try:
        res = Response()
        res.data = {'success':True}
        res.delete_cookie('access_token', path='/', samesite='None')
        res.delete_cookie('refresh_token', path='/', samesite='None')
        return res
    except:
        return Response({'success':False})

@api_view(['POST'])
@permission_classes({IsAuthenticated})
def is_authenticated(request):
    return Response({'authenticated':True})

@api_view(['POST'])
@permission_classes({AllowAny})
def register(request):
    serializer = MyUserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.error)@api_view(['PATCH'])
@permission_classes({IsAuthenticated})
def update_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(pk=pk)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if(appointment.user.id != request.user.id):
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    serializer = AppointmentSerializer(appointment, request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({**serializer.data, "success":True}, status=status.HTTP_200_OK)
    
    return Response({**serializer.errors, "success":False}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes({IsAuthenticated})
def get_appointments(request):
    appointments = Appointment.objects.filter(user_id=request.user.id)
    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes({IsAuthenticated})
def create_appointment(request):
    serializer = AppointmentSerializer(data={**request.data, "user":request.user.id})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes({IsAuthenticated})
def delete_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(pk=pk)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if(appointment.user.id != request.user.id):
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    appointment.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

