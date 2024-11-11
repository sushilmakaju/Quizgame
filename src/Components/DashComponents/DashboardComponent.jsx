import React from 'react';

const Dashboard = () => {
  return (
    <div className="ml-64 p-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">
          🍌 Banana Game
        </h1>
      </header>

      {/* Main Content Area */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-700">Welcome to the Banana Game Dashboard</h2>
        <p className="text-gray-600 mt-4">Here you can view your game history, check the leaderboard, take quizzes, and manage your account.</p>
      </section>
    </div>
  );
};

export default Dashboard;
