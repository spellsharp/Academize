from rest_framework import serializers
from .models import Students, Semester, Subject, Mark, FileUpload, Teacher, StudentUpload
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import os, shutil
import csv

class StudentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Students
        fields = ['id', 'name', 'roll_num', 'username', 'phone_number']


class SemesterSerializer(serializers.ModelSerializer):
    student = StudentsSerializer(read_only=True)

    class Meta:
        model = Semester
        fields = ['id', 'student', 'semester_num', 'cgpa']


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'subject']


class MarkSerializer(serializers.ModelSerializer):
    student_name = StudentsSerializer(read_only=True)
    subject = SubjectSerializer(read_only=True)

    class Meta:
        model = Mark
        fields = ['id', 'student_name', 'subject','semester_num', 'marks']

class UploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileUpload
        fields = '__all__'
    def create(self, validated_data):
        uploaded_file = FileUpload.objects.create(
            file=validated_data['file']
        )
        filePath = os.path.join('media/',str(uploaded_file.file))
        with open(filePath, 'r') as f:
            reader = csv.reader(f)
            for row in reader:
                print(row)
                roll_num = row[0]
                semesterNum = row[2]
                subjectId = row[3]
                marks = row[4]
                subject = Subject.objects.get(id=subjectId)
                print("********************")
                print(subject)
                print("********************")
                student = Students.objects.get(roll_num=roll_num)
                obj = Mark.objects.create(
                    student_name = student,
                    subject = subject,
                    semester_num = semesterNum,
                    marks = marks,
                    semester_id = 5,
                )
                obj.save()
            try:
                shutil.rmtree('media/')
            except:
                pass
                

        return uploaded_file

class StudentUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentUpload
        fields = '__all__'
    def create(self, validated_data, request):
        print("blabla")
        uploaded_file = StudentUpload.objects.create(
            file=validated_data['file']
        )
        filePath = os.path.join('media/',str(uploaded_file.file))
        with open(filePath, 'r') as f:
            reader = csv.reader(f)
            for row in reader:
                print(row)
                roll_num = row[0]
                student_name = row[1]
                phone_num = row[2]
                obj = Students.objects.create(
                    name = student_name,
                    roll_num = roll_num,
                    username = "student",
                    phone_number = phone_num,
                )
                obj2 = Teacher.objects.get_or_create(username=request.user.username, students=obj)
                obj.save()
                
                
            try:
                shutil.rmtree('media/')
            except:
                pass
                

        return uploaded_file


class TeacherSerializer(serializers.ModelSerializer):
    students = StudentsSerializer(many=True, read_only=True)

    class Meta:
        model = Teacher
        fields = ['id', 'username', 'students']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = ('username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username']
        )

        user.set_password(validated_data['password'])
        user.save()
        Teacher.objects.create(username=user.username)

        return user
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        # ...

        return token