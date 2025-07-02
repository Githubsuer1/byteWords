import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [currentImage, setCurrentImage] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);
  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dlvwuwtkv/image/upload";
  const CLOUDINARY_UPLOAD_PRESET = "blog_preset";


  // 1. Load existing blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/blogs/getBlog/${id}`, {
          headers: { Authorization: token }
        });
        if (res.data.success) {
          const blog = res.data.blog;
          // console.log(res.data.blog)
          setTitle(blog.title);
          setDescription(blog.description);
          setCurrentImage(blog.image);
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };
    fetchBlog();
  }, [id]);

  // 2. Upload image to Cloudinary if new image is selected
  const uploadToCloudinary = async () => {
    const formData = new FormData();
    formData.append('file', newImageFile);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET); // replace
    const res = await axios.post(CLOUDINARY_URL, formData);
    return res.data.secure_url;
  };

  // 3. Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = currentImage;

    if (newImageFile) {
      try {
        imageUrl = await uploadToCloudinary();
      } catch (err) {
        console.error("Image upload failed:", err);
        return;
      }
    }

    try {
      await axios.patch(
        `http://localhost:8000/api/v1/blogs/updateBlog/${id}`,
        { title, description, image: imageUrl },
        { headers: { Authorization: token } }
      );
      navigate(`/blog/${id}`);
    } catch (err) {
      console.error("Blog update failed:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Your Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows="6"
          className="w-full p-2 border rounded"
          required
        ></textarea>

        <div>
          <label className="block mb-1 font-medium">Current Image:</label>
          <img
            src={currentImage}
            alt="Current Blog"
            className="w-full max-h-60 object-cover rounded mb-2"
          />
          <input
            type="file"
            onChange={(e) => setNewImageFile(e.target.files[0])}
            className="block w-full"
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
