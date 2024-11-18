import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const SignupPage = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Form validation
  const validate = () => {
    const validationErrors = {};
    if (!userData.username) validationErrors.username = 'Username is required';
    if (!userData.email) validationErrors.email = 'Email is required';
    if (!userData.password) validationErrors.password = 'Password is required';

    return validationErrors; 
  };

  // Handle login navigation
  const handleLoginClick = () => {
    navigate("/"); 
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:8000/register/', {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        });
        console.log(response);
        toast.success('Registration successful');

        // Navigate to login page after successful registration
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error) {
        console.error(error.message);
        toast.error('Registration failed');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-200 to-yellow-400">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/90 rounded-2xl shadow-lg backdrop-blur-md transform transition duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-yellow-600">Create Account</h2>
        <p className="text-center text-gray-600">Sign up to get started!</p>
        <ToastContainer />
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 bg-yellow-50 rounded-lg border border-yellow-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 bg-yellow-50 rounded-lg border border-yellow-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 bg-yellow-50 rounded-lg border border-yellow-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
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
              className="font-semibold text-yellow-600 hover:text-yellow-700 underline transition duration-300"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
