from .models import Semester, Mark, Subject, Students, FileUpload, Teacher, StudentUpload
from .serializers import StudentsSerializer, MyTokenObtainPairSerializer, RegisterSerializer, SubjectSerializer, SemesterSerializer, MarkSerializer, UploadSerializer, TeacherSerializer, StudentUploadSerializer
from django.http import JsonResponse
from django.shortcuts import render, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework import status
from rest_framework import generics
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import FileUpload

import datetime

# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class StudentsView(viewsets.ModelViewSet):
    queryset = Students.objects.all()
    serializer_class = StudentsSerializer

class SubjectView(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class SemesterView(viewsets.ModelViewSet):
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer

class MarksView(viewsets.ModelViewSet):
    queryset = Mark.objects.all()
    serializer_class = MarkSerializer

class TeacherView(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

class LogoutView(APIView):
    
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
@csrf_exempt
def searchSemester(request):
    if request.method == 'GET':
        roll_num = request.GET.get('rollNum', '')
        semester_nums = request.GET.get('semesterNum', '').split(',')
        semesters = Semester.objects.filter(student__roll_num=roll_num, semester_num__in=semester_nums).values(
            'id',
            'semester_num',
            'cgpa',
            'student__id',
            'student__name',
            'student__roll_num',
            'student__username',
            'student__phone_number'
        )

        data = list(semesters)
        print()
        print(data)
        print()
        return JsonResponse(data, safe=False)
    else:
        return HttpResponse('Bad Request')

@csrf_exempt
def searchMarks(request):
    if request.method == 'GET':
        roll_num = request.GET.get('roll', '')
        semester_nums = request.GET.get('sem', '').split(',')
        semesters = Mark.objects.filter(student_name__roll_num=roll_num, semester_num__in=semester_nums).values(
            'id',
            'semester_num',
            'semester__cgpa',
            'student_name__id',
            'student_name__name',
            'student_name__roll_num',
            'student_name__username',
            'student_name__phone_number',
            'subject__id',
            'subject__subject',
            'marks'
        )

        data = list(semesters)
        print()
        print(data)
        print()
        return JsonResponse(data, safe=False)
    else:
        return HttpResponse('Bad Request')

class UploadStudentsView(viewsets.ModelViewSet):
    queryset = StudentUpload.objects.all()
    serializer_class = StudentUploadSerializer
    print("-------------------")
    print(datetime.datetime.now())
    print("--------------------")    

class UploadView(viewsets.ModelViewSet):
    queryset = FileUpload.objects.all()
    serializer_class = UploadSerializer
    print("-------------------")
    print(datetime.datetime.now())
    print("--------------------")

def home(request):
    return render(request, 'base.html')

def update_semester(request):
    if request.user.username =='shrisharanyan':

        semester = Semester.objects.all()
        student = None
        marks = Mark.objects.all()
        
        try:
            
            if request.method == 'POST':
                student_userName = request.POST['student_id']
                semNum = request.POST['semester_num']
                semcgpa = request.POST['cgpa']
                markV = request.POST['marks']
                s_id = request.POST['subject_id']
                student = Students.objects.get(roll_num=student_userName)
                
                # TODO
                if markV == "":
                    student_marks = marks.objects.filter(student_name=student, subject_id=s_id, semester_id=5, semester_num=semNum)
                    markV = student_marks

                mark, created = Mark.objects.get_or_create(
                    student_name=student,
                    subject_id=s_id,
                    semester_id=5, #semester_id=5 corresponds to dummy semester.
                    semester_num=semNum,
                    defaults={'marks': markV},
                )


                if not created:
                    mark.marks = markV
                    mark.save()
                    print("Updated Marks")
                else:
                    print("Added Marks")
                
                semester, created = Semester.objects.get_or_create(
                student=student,
                semester_num=semNum,
                defaults={'cgpa': semcgpa},
                )

                if not created:
                    semester.cgpa = semcgpa
                    semester.save(update_fields=['cgpa'])
                    print("Updated CGPA")
                else:
                    print("Added CGPA")
                    
                return render(request, 'success.html')
            
            return render(request, 'update_semester.html', {'semester': semester, 'marks': marks, 'student': student})
        
        except ValueError:
            return HttpResponse("Enter all the values!")
    else:
        return HttpResponse("Authentcation Failed")