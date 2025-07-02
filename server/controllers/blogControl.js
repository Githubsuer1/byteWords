import Blog from '../models/blogModel.js';
import ensureAuthentication from '../middlewares/auth.validation.js';


const blogControl = {
    getBlogs: async (req, res) => {
        try {
            const blogs = await Blog.find().populate("author", "_id username email").sort({ createdAt: -1 });
            if (!blogs) {
                return res.status(200).json({
                    success: false,
                    message: "No Blogs found!"
                })
            }

            return res.status(200).json({
                success: true,
                message: "All Blogs listed here",
                blogs
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error
            })
        }
    },
    createBlog: async (req, res) => {
        try {
            const { title, description, image } = req.body;
            // console.log(title,description,image);
            if (!title || !description || !image) {
                return res.status(400).json({
                    status: false,
                    message: "All fields required",
                });
            }

            const newBlog = new Blog({ title, description, image, author: req.user._id });
            await newBlog.save();
            return res.status(200).json({
                success: true,
                message: 'Blog created successfully',
                newBlog
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error
            })
        }
    },
    updateBlog: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedBlog) {
                return res.status(404).json({
                    success: false,
                    message: "Blog not found",
                });
            }
            return res.status(200).json({
                success: true,
                message: "Blog updated successfully",
                updatedBlog
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error
            })
        }
    },
    getBlogById: async (req, res) => {
        try {
            const { id } = req.params;
            const blog = await Blog.findById(id);
            if (!blog) {
                return res.status(400).json({
                    success: false,
                    message: "Blog not found",
                })
            };
            return res.status(200).json({
                success: true,
                message: "Blog found",
                blog
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error
            });
        }
    },
    deleteBlog: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedBlog = await Blog.findByIdAndDelete(id);

            if (!deletedBlog) {
                return res.status(404).json({ success: false, message: "Blog not found" });
            }

            return res.status(200).json({
                success: true,
                message: "Blog deleted successfully",
                blog: deletedBlog
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error
            });
        }
    },
    userBlog: async (req, res) => {
        try {
            const { id } = req.params;

            // Find all blogs where `author` field matches this id
            const blogs = await Blog.find({ author: id }).populate("author", "-password"); // optional: populate user details except password

            // console.log(blogs);
            if (!blogs || blogs.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No blogs found for this user",
                });
            }

            res.status(200).json({
                success: true,
                blogs,
            });
        } catch (error) {
            console.error("Error in userBlog controller:", error.message);
            res.status(500).json({
                success: false,
                message: "Internal Server Error!",
            });
        }
    }

}

export default blogControl;