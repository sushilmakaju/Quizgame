import React from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/"); 
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-200 to-yellow-400">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/90 rounded-2xl shadow-lg backdrop-blur-md transform transition duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-yellow-600">Create Account</h2>
        <p className="text-center text-gray-600">Sign up to get started!</p>
        <form className="space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 bg-yellow-50 rounded-lg border border-yellow-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white"
              required
            />
          </div>
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 bg-yellow-50 rounded-lg border border-yellow-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white"
              required
            />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 bg-yellow-50 rounded-lg border border-yellow-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white"
              required
            />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 bg-yellow-50 rounded-lg border border-yellow-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 font-semibold text-white bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button 
            onClick={handleLoginClick}
            className="font-semibold text-yellow-600 hover:text-yellow-700 underline transition duration-300">
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
