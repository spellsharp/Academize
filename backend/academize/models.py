from django.db import models

class Students(models.Model):
    name = models.CharField(max_length=150)
    roll_num = models.CharField(max_length=150)
    username = models.CharField(max_length=150)
    phone_number = models.CharField(max_length=20)
    def __str__(self):
        return f"{self.name} - {self.roll_num}"

class Teacher(models.Model):
    username = models.CharField(max_length=150)
    students = models.ManyToManyField(Students)

    def __str__(self):
        return self.username

class Semester(models.Model):
    student = models.ForeignKey(Students, on_delete=models.CASCADE)
    semester_num = models.IntegerField(default=0)
    cgpa = models.FloatField(default=0)

    def __str__(self):
        return f"{self.student.name} - Semester {self.semester_num}"


class Subject(models.Model):
    subject = models.CharField(max_length=150)

    def __str__(self):
        return self.subject
    

class Mark(models.Model):

    student_name = models.ForeignKey(Students, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)
    semester_num = models.IntegerField(default=0)
    marks = models.FloatField(default=0)
    
    def __str__(self):
        return f"{self.subject} - {self.semester_num}: {self.marks}"
    
class FileUpload(models.Model):
    file = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name
    
class StudentUpload(models.Model):
    file = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name
    

my_model_instance = FileUpload.objects.all()
