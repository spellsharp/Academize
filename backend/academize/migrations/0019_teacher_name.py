# Generated by Django 4.1.7 on 2023-06-05 15:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('academize', '0018_rename_name_teacher_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='teacher',
            name='name',
            field=models.CharField(default='N/A', max_length=150),
            preserve_default=False,
        ),
    ]