# Generated by Django 4.1.7 on 2023-06-05 15:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('academize', '0019_teacher_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='teacher',
            name='name',
        ),
    ]
