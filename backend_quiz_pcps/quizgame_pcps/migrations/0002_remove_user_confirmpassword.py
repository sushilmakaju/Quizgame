# Generated by Django 4.2 on 2024-11-12 06:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('quizgame_pcps', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='confirmPassword',
        ),
    ]
