# Generated by Django 4.1.7 on 2023-04-15 11:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('academize', '0013_students_phone_number'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mark',
            name='semester',
        ),
    ]