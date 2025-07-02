import express from 'express';
import blogControl from '../controllers/blogControl.js';
import ensureAuthentication from '../middlewares/auth.validation.js';


const router = express.Router();

router.route('/getAllBlogs').get(ensureAuthentication,blogControl.getBlogs);
router.route('/createBlog').post(ensureAuthentication,blogControl.createBlog);
router.route('/updateBlog/:id').patch(ensureAuthentication,blogControl.updateBlog);
router.route('/getBlog/:id').get(ensureAuthentication,blogControl.getBlogById);
router.route('/deleteBlog/:id').delete(ensureAuthentication,blogControl.deleteBlog);
router.route('/getUserBlog/:id').get(ensureAuthentication,blogControl.userBlog);


export default router;
