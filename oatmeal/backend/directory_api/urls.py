from django.urls import path
from . import views

urlpatterns = [
    path('countries/', views.get_countries),
    path('states/', views.get_states),
    path('businesses/', views.get_businesses),
    path('business_details/', views.get_business_details),
]
