# Generated by Django 4.1.7 on 2023-04-04 14:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('academize', '0007_rename_sub_subject_subject_remove_marks_student_name_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Marks',
            new_name='Mark',
        ),
    ]
