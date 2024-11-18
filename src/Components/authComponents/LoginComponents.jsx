import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!loginData.email) errors.email = "Email is required";
    if (!loginData.password) errors.password = "Password is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:8000/login/",
          loginData
        );
        console.log(response);

        const { token} = response.data; // Ensure you have user_role from response
        localStorage.setItem("token", token);
        

        // dispatch(login({ token })); // Dispatch the token

        toast.success("Login successful");

        // Redirect to different dashboards based on the role
        setTimeout(() => {
          navigate("/dashboard")

        }, 2000);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error("Incorrect email or password. Please try again.");
        } else {
          toast.error("Something went wrong. Please try again later.");
        }
      }
    }
  };

  const handleSignUpClick = () => {
    navigate("/signup"); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-200 to-yellow-400">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/90 rounded-2xl shadow-lg backdrop-blur-md transform transition duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-yellow-600">Welcome Back</h2>
        <p className="text-center text-gray-600">Please login to your account</p>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={loginData.email}
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
              value={loginData.password}
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

      {/* ToastContainer to show notifications */}
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
