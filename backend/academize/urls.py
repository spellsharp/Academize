from django.urls import path
from . import views
  
urlpatterns = [
    path('logout/', views.LogoutView.as_view(), name ='logout'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),

]