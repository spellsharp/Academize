"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from academize import views
from academize.views import update_semester, home, searchSemester, searchMarks
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views

router = routers.DefaultRouter()
router.register(r'semester',views.SemesterView, 'semester')
router.register(r'marks', views.MarksView, 'marks')
router.register(r'students', views.StudentsView, 'students')
router.register(r'subjects', views.SubjectView, 'subjects')
router.register(r'upload', views.UploadView, 'upload')
router.register(r'teacher', views.TeacherView, 'teacher')
router.register(r'uploadstudents', views.UploadStudentsView, 'uploadstudents')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('add_edit/', update_semester, name='add_eidt'),
    path('',home, name='home'),
    path('', include('academize.urls')),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name ='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name ='token_refresh'),
    path('api/', include(router.urls)),
    path('api/searchSem/', searchSemester, name='searchSem'),
    path('api/searchMark/', searchMarks, name='searchMark'),
]
