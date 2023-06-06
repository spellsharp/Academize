# Generated by Django 4.1.7 on 2023-04-04 12:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('academize', '0003_rename_name_subject_sub_semester_marks_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='semester',
            name='marks',
        ),
        migrations.CreateModel(
            name='Marks',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('marks', models.FloatField(default=0)),
                ('semester', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='academize.semester')),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='academize.subject')),
            ],
        ),
    ]
