import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/signup"); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-200 to-yellow-400">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/90 rounded-2xl shadow-lg backdrop-blur-md transform transition duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-yellow-600">Welcome Back</h2>
        <p className="text-center text-gray-600">Please login to your account</p>
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
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 bg-yellow-50 rounded-lg border border-yellow-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 font-semibold text-white bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <button
              onClick={handleSignUpClick}
              className="font-semibold text-yellow-600 hover:text-yellow-700 underline transition duration-300"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
