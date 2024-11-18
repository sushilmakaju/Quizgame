from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    username = models.CharField(max_length=200, blank=False, null=False, unique=True)  # Make username required
    email = models.EmailField(unique=True)  # Email is unique and required
    password = models.CharField(max_length=200)

    
        # Specify email as the unique identifier for authentication
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  # Add username to required fields

    def __str__(self):
        return self.email
    

class GameHistory(models.Model):
 
    student = models.ForeignKey(User,on_delete=models.CASCADE)
    gamedate = models.DateTimeField(auto_now_add=True)
    total_questions = models.PositiveSmallIntegerField(default=0)
    score = models.PositiveSmallIntegerField(default=0)
    remarks = models.CharField(max_length=20,default='No remarks')

    def __str__(self) -> str:
        return self.student.email
