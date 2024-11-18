from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from django.http import JsonResponse
from .serializers import * # Adjust the import if necessary
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from .models import *
from django.utils import timezone
import json
from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
import logging
from django.db.models import Sum, Max




class RegisterUserView(GenericAPIView):
    
    permission_classes = [AllowAny]
    
    """
    Class-based view for registering a new user with serialized validation.
    
    Permission:
        AllowAny: Allows any user (authenticated or not) to access this view.
    """
  
    def post(self, request):
        """
        Handles user registration by validating and saving user data, including password confirmation.

        Args:
            request (HttpRequest): The incoming request containing user registration details.

        Returns:
            Response: Returns a success message on successful registration,
                      or error details if the data is invalid.
        """
        # Retrieve password and confirm password fields from request data
        password = request.data.get("password")
        

        # Hash the password before saving
        request.data['password'] = make_password(password)

        # Initialize the serializer with request data
        serializer = Userserializers(data=request.data)
        
        # Validate and save the user data if valid
        if serializer.is_valid():
            serializer.save()
            return Response('User created successfully', status=status.HTTP_201_CREATED)
        
        # Return validation errors if data is invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class LoginAPIView(GenericAPIView):
    
    permission_classes = [AllowAny]
    
    """
        Handles user login by validating username and password

        Args:
            request (HttpRequest): The incoming request containing user login details.

        Returns:
            Response: Returns a success message on successful login,
                      or error details if the data is invalid.
        """


    def post(self, request):
        
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(username=email, password=password)
        
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                })
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


logger = logging.getLogger(__name__)

# @api_view(['GET'])
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
# def get_student_game_history(request):
#     """
#     Gets logged-in user's game history records
#     """
#     try:
#         # Debug print
#         logger.debug(f"Fetching history for user: {request.user}")
        
#         history = list(GameHistory.objects.filter(student=request.user)
#                       .order_by('-gamedate')
#                       .values('id', 'gamedate', 'total_questions', 'score', 'remarks'))
        
#         # Debug print
#         logger.debug(f"Found {len(history)} history records")
        
#         return JsonResponse(history, safe=False)
    
    # except Exception as e:
    #     logger.error(f"Error in get_student_game_history: {str(e)}")
    #     return JsonResponse(
    #         {'error': 'Failed to fetch game history'}, 
    #         status=500
    #     )

# @login_required
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def store_game_history(request):
    """
    Stores the logged-in user's game history

    Args:
        request (POST request): gets user's game activity in JSON format

    Returns:
        JsonResponse: success or error message
    """
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            
            # Use request.user directly instead of fetching by student_id
            total_questions = data.get('total_questions', 0)
            score = data.get('score', 0)
            remarks = data.get('remarks', 'No remarks')
            
            print(f"Authenticated user: {request.user}")

            game_history = GameHistory.objects.create(
                student=request.user,
                
                gamedate=timezone.now(),
                total_questions=total_questions,
                score=score,
                remarks=remarks
            )
            print(f"Game history saved: {game_history}")
            
            

            return JsonResponse({'message': 'Game history stored successfully'}, status=201)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)





@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def history(request):
    """
    Gets the user's game history and returns it as JSON.
    """
    try:
        # Debug print
        logger.debug(f"History view accessed by user: {request.user}")
        
        if not request.user.is_authenticated:
            return JsonResponse(
                {'error': 'User not authenticated'}, 
                status=401
            )

        # Directly fetch the history instead of calling get_student_game_history
        history = list(GameHistory.objects.filter(student=request.user)
                      .order_by('-gamedate')
                      .values('id', 'gamedate', 'total_questions', 'score', 'remarks'))
        
        # Debug print
        logger.debug(f"Retrieved {len(history)} records for user")
        
        return JsonResponse(history, safe=False)

    except Exception as e:
        logger.error(f"Error in history view: {str(e)}")
        return JsonResponse(
            {'error': 'An error occurred while fetching game history'}, 
            status=500
        )
        

from django.db.models import Sum, F,Count

class LeaderboardView(GenericAPIView):
    def get(self, request):
        leaderboard = (
            GameHistory.objects
            .values('student__username', 'student__email')  # Include both username and email
            .annotate(
                rank_score=Sum('score'),
                games_played=Count('id'),
            )
            .order_by('-rank_score')
        )
        
        print("Debug - Leaderboard data:", list(leaderboard))  # Add this for debugging
        
        return Response({
            'status': 'success',
            'data': list(leaderboard)
        })
        

class UserProfileView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        data = {
            'username': user.username,
            'email': user.email,
            'id': user.id
        }
        return Response(data)