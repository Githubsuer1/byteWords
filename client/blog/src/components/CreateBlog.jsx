import React from 'react';
import { handleError, handleSuccess } from '../utils/toastContainer';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


const CreateBlog = () => {

  const [title, setTitle] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [image, setImage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dlvwuwtkv/image/upload";
  const CLOUDINARY_UPLOAD_PRESET = "blog_preset";

  // image upload handler
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const response = await axios.post(CLOUDINARY_URL, formData);
    return response.data.secure_url; // this is the image URL
  };


  // handlesubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !desc || !image) {
      return handleError('Please fill all fields and upload an image.');
    }

    setLoading(true);

    try {
      // 1. Upload image to Cloudinary
      const imageUrl = await handleImageUpload(image);
      // console.log(imageUrl);

      // 2. Send blog data to backend
      const blogData = { title, description: desc, image: imageUrl };

      const token = localStorage.getItem('token');
      const headers = { Authorization: `${token}` };


      const response = await axios.post('http://localhost:8000/api/v1/blogs/createBlog', blogData, { headers });
      if (response.data.success) {
        handleSuccess("Blog created successfully!");
        setTimeout(() => { navigate('/allblogs') }, 1000)
      } else {
        handleError(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      handleError("Failed to create blog. Please try again.");
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="min-h-screen pt-20 px-4 bg-indigo-50 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Create a Blog</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              id="title"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="desc"
              rows="6"
              className="w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Write your blog..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition duration-300"
          >
            {loading ? 'Creating...' : 'Create Blog'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
