import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { handleError, handleSuccess } from '../utils/toastContainer.js';

const Signup = () => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!username || !email || !password) {
        return handleError("Name, Email and Password must be filled!");
      }

      const response = await axios.post("http://localhost:8000/api/v1/users/register",
        { username, email, password },
        { withCredentials: true }
      );

      if (response.data.success === true) {
        handleSuccess("Successfully signed up..");
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else if (response.data.message === "Validation error") {
        return handleError(response.data.error);
      } else {
        return handleError(response.data.message);
      }
    } catch (error) {
      handleError(error || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 p-4">
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-md p-8 rounded-xl shadow-xl space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Create an Account</h1>

        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-sm text-gray-700">Username</label>
          <input
            autoFocus
            type="text"
            name="name"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-sm text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-all duration-300"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
