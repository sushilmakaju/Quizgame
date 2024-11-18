from django.urls import path
from .views import *
from .import views

urlpatterns = [
   
   path('register/',RegisterUserView.as_view(), name='register_view'),
   path('login/', LoginAPIView.as_view(), name='login_view'),
   path('api/history/',views.history, name='history'),
   path('api/posthistory/',views.store_game_history, name='posthistory'),
   path('api/leaderboard/', LeaderboardView.as_view(), name='api_leaderboard'),
   path('api/user/profile/', UserProfileView.as_view(), name='user_profile'),
   
   # path('api/gethistory/', StoreGameHistoryView.as_view(), name = 'game_history'),
]
