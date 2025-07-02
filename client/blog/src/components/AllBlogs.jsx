// src/components/Blogs.jsx
import React, { useEffect, useState } from 'react';
import Blog from './Blog';
import axios from 'axios';

const Blogs = () => {
  const [blog, setBlog] = useState([]);
  const token = localStorage.getItem('token');

  const getBlogs = async () => {
    try {
      const headers = { Authorization: `${token}` };
      const response = await axios.get('http://localhost:8000/api/v1/blogs/getAllBlogs', {
        headers: headers
      });
      // console.log(response)
      if (response?.data?.success) {
        setBlog(response?.data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // will render all blogs on initial rendering 
  useEffect(() => {
    getBlogs();
  }, [])


  return (
    <div className="flex flex-col w-full items-center gap-6 p-4 sm:p-8 bg-gray-50 min-h-screen">

      {
        blog && blog.map(item => (<Blog item={item} key={item._id} />))
      }

    </div>
  );
};

export default Blogs;
