import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaTrophy, FaListAlt, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [greeting, setGreeting] = useState("");

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    setGreeting(getTimeBasedGreeting());

    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }

        const response = await axios.get("http://localhost:8000/api/user/profile/", {
          headers: {
            Authorization: `Token ${token}`
          },
        });
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        navigate("/");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleStart = () => navigate("/question");
  const handleHighscore = () => navigate("/history");
  const handleLeaderboard = () => navigate("/leaderboard");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 p-4">
      <div className="w-full max-w-md bg-white/30 rounded-2xl shadow-2xl backdrop-blur-lg overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 text-center">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg animate-pulse">
            {greeting}, {username || "Player"}!
          </h1>
          <p className="text-white/80 mt-2">Ready for a challenge?</p>
        </div>

        <div className="p-6 space-y-4">
          {[
            { 
              label: "Start Game", 
              icon: FaPlay, 
              onClick: handleStart, 
              bgClass: "from-green-400 to-green-600 hover:from-green-500 hover:to-green-700" 
            },
            { 
              label: "History", 
              icon: FaTrophy, 
              onClick: handleHighscore, 
              bgClass: "from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700" 
            },
            { 
              label: "Leaderboard", 
              icon: FaListAlt, 
              onClick: handleLeaderboard, 
              bgClass: "from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700" 
            },
            { 
              label: "Logout", 
              icon: FaSignOutAlt, 
              onClick: handleLogout, 
              bgClass: "from-red-400 to-red-600 hover:from-red-500 hover:to-red-700" 
            }
          ].map(({ label, icon: Icon, onClick, bgClass }) => (
            <button
              key={label}
              onClick={onClick}
              className={`w-full flex items-center justify-center px-4 py-3 font-semibold text-white rounded-lg shadow-md 
                bg-gradient-to-r ${bgClass} 
                transition duration-300 transform hover:scale-105 active:scale-95`}
            >
              <Icon className="mr-2" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;