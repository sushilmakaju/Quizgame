import React, { useState, useEffect } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [rankedUsers, setRankedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No authentication token found. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:8000/api/leaderboard/", {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      const transformedData = response.data.data.map((user) => ({
        username: user.student__username,
        email: user.student__email,
        gamesPlayed: user.games_played || 0,
        score: user.rank_score || 0,
      }));

      setRankedUsers(transformedData);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching leaderboard data");
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
      <div className="mb-6 text-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 py-6 rounded shadow-lg">
        <h1 className="text-4xl font-bold text-white">🎮 Leaderboard 🎮</h1>
        <p className="mt-2 text-lg text-gray-200">👏 Top Players 👏</p>
      </div>

      <div className="w-full bg-white p-6 shadow-md rounded-lg h-[80vh] overflow-auto">
        <table className="w-full border-collapse border-spacing-0">
          <thead>
            <tr className="bg-gradient-to-r from-green-300 to-blue-300 text-black">
              <th className="px-5 py-3 text-left font-bold">S.N</th>
              <th className="px-5 py-3 text-left font-bold">Player</th>
              <th className="px-5 py-3 text-left font-bold">Email</th>
              <th className="px-5 py-3 text-center font-bold">Games Played</th>
              <th className="px-5 py-3 text-center font-bold">Total Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rankedUsers && rankedUsers.length > 0 ? (
              rankedUsers.map((user, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="px-5 py-4 text-center font-medium text-gray-800">
                    {index + 1}
                  </td>
                  <td className="px-5 py-4 font-semibold text-gray-800">
                    {user.username}
                  </td>
                  <td className="px-5 py-4 text-gray-600">{user.email}</td>
                  <td className="px-5 py-4 text-center">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      {user.gamesPlayed} 🎮
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center font-bold text-green-600">
                    {user.score}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-5 py-5 text-center text-gray-600"
                >
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
