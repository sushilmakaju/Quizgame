from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.

class userHistory(models.Model):
    """ creates userhistory table in  the database

    Args:
        models (class): extends models.Model class from django.db module

    Returns:
        database table: returs database table name and its columns with properties
    """
    student = models.ForeignKey(User,on_delete=models.CASCADE)
    gamelevel = models.PositiveIntegerField(default=0)
    total_questions = models.PositiveIntegerField(default=0)
    correct_answers = models.PositiveIntegerField(default=0)

    def __str__(self) -> str:
        return self.student.email
    
class GameHistory(models.Model):
    """ create GameHistory table in  the database

    Args:
        models (class): extends models.Model class from django.db module

    Returns:
        database table: returs database table name and its columns with properties
    """
    student = models.ForeignKey(User,on_delete=models.CASCADE)
    gamedate = models.DateTimeField(auto_now_add=True)
    level_achieved = models.PositiveSmallIntegerField(default=0)
    total_questions = models.PositiveSmallIntegerField(default=0)
    score = models.PositiveSmallIntegerField(default=0)
    remarks = models.CharField(max_length=20,default='No remarks')

    def __str__(self) -> str:
        return self.student.email
    

class GameLevel(models.Model):
    """ create GameLevel table in  the database

    Args:
        models (class): extends models.Model class from django.db module

    Returns:
        database table: returs database table name and its columns with properties
    """
    glevel = models.PositiveSmallIntegerField()
    total_questions = models.PositiveSmallIntegerField()
    total_time = models.PositiveSmallIntegerField()

    def __str__(self) -> str:
        return str(self.glevel)
