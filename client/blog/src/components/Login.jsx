import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { handleError, handleSuccess } from '../utils/toastContainer.js';
import { useDispatch } from 'react-redux';
import { authActions } from '../authSlice/authReducer.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return handleError("Email and password are required!");
    }
    try {
      const response = await axios.post("http://localhost:8000/api/v1/users/login",{ email, password },{ withCredentials: true });

      if (response.data.success === true) {
        dispatch(authActions.login());
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        handleSuccess("Login successfully");
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else if (response.data.message === "Validation error") {
        return handleError(response.data.error);
      } else {
        return handleError(response.data.message);
      }
    } catch (error) {
      handleError(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-md p-8 rounded-xl shadow-xl space-y-6">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Login</h1>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-sm text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 text-sm text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition-all duration-300"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
