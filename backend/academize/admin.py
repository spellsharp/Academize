from django.contrib import admin
from .models import Students, Semester, Mark, FileUpload, Teacher, StudentUpload


class MarksInline(admin.TabularInline):
    model = Mark
    # exclude = ('student_name',)


class SemesterAdmin(admin.ModelAdmin):
    # inlines = [MarksInline]
    model = Semester

class TeacherAdmin(admin.ModelAdmin):
    model = Teacher

class StudentAdmin(admin.ModelAdmin):
    model = Students
    list_display = ('name', 'roll_num')
    search_fields = ['name', 'roll_num']
    actions = ['create_semesters']

    def create_semesters(self, request, queryset):
        for student in queryset:
            student.create_semesters()
    create_semesters.short_description = "Create semesters for selected students"

class FileAdmin(admin.ModelAdmin):
    model = FileUpload

class StudentFileAdmin(admin.ModelAdmin):
    model = StudentUpload

admin.site.register(Students, StudentAdmin)
admin.site.register(Semester, SemesterAdmin)
admin.site.register(Mark)
admin.site.register(FileUpload, FileAdmin)
admin.site.register(Teacher, TeacherAdmin)
admin.site.register(StudentUpload, StudentFileAdmin)