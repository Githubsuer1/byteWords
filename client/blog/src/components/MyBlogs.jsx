import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { handleError } from '../utils/toastContainer.js';
import Blog from './Blog.jsx';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // to manage conditional check

  const getUserBlog = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      // Defensive check
      if (!token || !user) {
        handleError("User not authenticated");
        return;
      }

      const { id } = JSON.parse(user);
      const headers = { Authorization: `${token}` };

      const response = await axios.get(`http://localhost:8000/api/v1/blogs/getUserBlog/${id}`, {headers});

      if (response?.data?.success && response.data.blogs.length > 0) {
        setBlogs(response.data.blogs);
      } else {
        handleError("No blogs found!");
      }
    } catch (error) {
      handleError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserBlog();
  }, []);

  return (
    <div className="flex flex-col w-full items-center gap-6 p-4 sm:p-8 bg-gray-50 min-h-screen">
      {
        blogs && blogs.map(item => (<Blog item={item} key={item._id} />))
      }
    </div>
  );
};

export default MyBlogs;
