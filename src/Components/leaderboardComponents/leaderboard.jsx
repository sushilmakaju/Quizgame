import React, { useState, useEffect } from "react";
import axios from 'axios';

const Leaderboard = () => {
  const [rankedUsers, setRankedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setError('No authentication token found. Please log in.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:8000/api/leaderboard/', {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const transformedData = response.data.data.map(user => ({
        username: user.student__username,
        email: user.student__email,
        gamesPlayed: user.games_played || 0,
        score: user.rank_score || 0
      }));
      
      console.log('Transformed data:', transformedData); // Debug log
      setRankedUsers(transformedData);
      setError(null);
    } catch (error) {
      console.error('Error details:', error.response || error);
      setError(error.response?.data?.message || 'Error fetching leaderboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl">{error}</p>
          <button 
            onClick={fetchLeaderboardData}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl text-center font-black text-gray-800">🎮 Leaderboard 🎮</h1>
      <p className="mb-6 text-center text-gray-600">👏 Today's Top Players 👏</p>

      <div className="w-full bg-white p-6 shadow-md h-[80vh] overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-green-300 text-left font-extrabold uppercase tracking-widest text-black">
              <th className="px-5 py-3">Player</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3 text-center">Games Played</th>
              <th className="px-5 py-3 text-center">Total Score</th>
            </tr>
          </thead>
          <tbody className="text-gray-500">
            {rankedUsers && rankedUsers.length > 0 ? (
              rankedUsers.map((user, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="border-b border-gray-200 px-5 py-5 text-sm">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="whitespace-no-wrap font-semibold">{user.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-gray-200 px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap text-gray-600">{user.email}</p>
                  </td>
                  <td className="border-b border-gray-200 px-5 py-5 text-sm text-center">
                    <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">
                      {user.gamesPlayed} 🎮
                    </span>
                  </td>
                  <td className="border-b border-gray-200 px-5 py-5 text-sm text-center">
                    <p className="whitespace-no-wrap font-bold text-green-600">{user.score}</p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-5 py-5 text-center text-gray-600">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Leaderboard;