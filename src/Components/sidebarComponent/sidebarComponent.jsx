import React, { useState } from 'react';

function Sidebar({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside id="asidebox" className="fixed z-50 md:relative">
      {/* Sidebar Toggle for Mobile */}
      <input
        type="checkbox"
        className="peer hidden"
        id="sidebar-open"
        checked={isOpen}
        onChange={toggleSidebar}
      />
      <label
        htmlFor="sidebar-open"
        onClick={toggleSidebar}
        className="peer-checked:rounded-full peer-checked:p-2 peer-checked:right-6 peer-checked:bg-gray-600 peer-checked:text-white absolute top-8 z-20 mx-4 cursor-pointer md:hidden"
      >
        {/* Hamburger Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </label>

      {/* Sidebar Navigation */}
      <nav
        aria-label="Sidebar Navigation"
        className={`${
          isOpen ? 'w-64' : 'w-0'
        } left-0 z-10 flex h-screen flex-col overflow-hidden bg-gray-900 text-white transition-all md:h-screen md:w-64 lg:w-72`}
      >
        {/* Logo and Heading */}
        <div className="mt-5 py-4 pl-10 md:mt-10">
          <span className="flex items-center">
            <span className="mr-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-2xl font-bold">🍅</span>
            <span className="text-xl font-semibold">Tomato Game</span>
          </span>
        </div>

        {/* Navigation Links */}
        <ul className="mt-8 space-y-3 md:mt-20">
          <li className="relative">
            <a href="/history" className="flex w-full items-center space-x-2 rounded-md px-10 py-4 font-semibold hover:bg-gray-700">
              <span>🍅 History</span>
            </a>
          </li>
          <li className="relative">
            <a href="/leaderboard" className="flex w-full items-center space-x-2 rounded-md px-10 py-4 font-semibold hover:bg-gray-700">
              <span>🏆 Leaderboard</span>
            </a>
          </li>
          <li className="relative">
            <a href="/game" className="flex w-full items-center space-x-2 rounded-md px-10 py-4 font-bold hover:bg-gray-700">
              <span>🎮 Quizzes</span>
            </a>
          </li>
          <li className="relative">
            <a href="/logout" className="flex w-full items-center space-x-2 rounded-md px-10 py-4 font-semibold hover:bg-gray-700">
              <span>🚪 Logout</span>
            </a>
          </li>
        </ul>

        {/* User Information (at the bottom) */}
        <div className="my-6 mt-auto ml-10 flex items-center cursor-pointer">
          {/* Optional Profile Picture */}
          {/* <img className="h-12 w-12 rounded-full" src="#" alt="Profile Picture" /> */}
          <div className="ml-3">
            {/* <p className="font-medium">{user.username}</p>
            <p className="text-sm text-gray-300">{user.email}</p> */}
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
