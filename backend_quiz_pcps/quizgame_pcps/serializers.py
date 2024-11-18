from rest_framework import serializers
from .models import *

class Userserializers(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = ['username', 'email', 'password', 'confirmPassword']
        fields = "__all__"
        
class GameHistorySerializer(serializers.ModelSerializer):

    class Meta:
        model = GameHistory
        fields = "__all__"
        
