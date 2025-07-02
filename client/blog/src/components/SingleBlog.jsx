import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EllipsisVertical } from 'lucide-react';

const SingleBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user')); // Assuming it's stored on login
    // console.log(user.id);

    const fetchBlog = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/blogs/getBlog/${id}`, {
                headers: { Authorization: `${token}` }
            });
            if (response.data.success) {
                setBlog(response.data.blog);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;

        try {
            await axios.delete(`http://localhost:8000/api/v1/blogs/deleteBlog/${id}`, {
                headers: { Authorization: `${token}` }
            });
            navigate('/'); // Redirect to all blogs after delete
        } catch (error) {
            console.error("Failed to delete blog", error);
        }
    };

    const handleEdit = () => {
        navigate(`/update/${id}`); // You should create this route/component
    };

    useEffect(() => {
        fetchBlog();
    }, [id]);

    if (!blog) return <div className="p-8 text-center">Loading...</div>;

    const isAuthor = user.id === blog.author;
    // console.log( blog)
    return (
        <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
            <div className="relative max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">

                {/* Dropdown for Author */}
                {isAuthor && (
                    <div className="absolute top-4 right-4">
                        <button onClick={() => setShowMenu(!showMenu)} className="focus:outline-none">
                            <EllipsisVertical className="w-6 h-6 text-gray-600" />
                        </button>
                        {showMenu && (
                            <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-md z-10">
                                <button onClick={handleEdit} className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-sm">Edit</button>
                                <button onClick={handleDelete} className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-sm text-red-600">Delete</button>
                            </div>
                        )}
                    </div>
                )}

                <h1 className="text-3xl font-bold mb-4 text-blue-700">{blog.title}</h1>
                <p className="text-gray-700 whitespace-pre-wrap text-base sm:text-lg">{blog.description}</p>

                {blog.image && (
                    <img
                        src={blog.image}
                        alt="Blog"
                        className="mt-6 rounded w-full object-cover max-h-[400px]"
                    />
                )}
            </div>
        </div>
    );
};

export default SingleBlog;
