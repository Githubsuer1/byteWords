import React from 'react';
import { Link } from 'react-router-dom';

// Helper to format date
const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const Blog = ({ item }) => {
  const { title, description, image, createdAt, author, _id } = item;

  return (
    <Link to={`/blog/${_id}`} className="w-full max-w-md">
      <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Top Info */}
        <div className="px-4 pt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-500 text-sm">
          <p>👤 <span className="font-medium">{author?.username}</span></p>
          <p> {formatDate(createdAt)}</p>
        </div>

        {/* Blog Image */}
        <img src={image} alt={title} className="w-full h-48 sm:h-56 object-cover mt-2" />

        {/* Blog Content */}
        <div className="p-4">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-700 mb-2">{title}</h2>
          <p className="text-gray-600 text-sm sm:text-base line-clamp-3">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default Blog;
