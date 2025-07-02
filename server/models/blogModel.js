import mongoose from "mongoose";
// import User from '../models/userModel.js';


const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'title is required']
    },
    description:{
        type:String,
        required:[true,'description is required']
    },
    image:{
        type:String,
        required:[true,'image is required']
    },
    author:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'user id is required']
    }
},
{timestamps:true}
);

const Blog = mongoose.model('Blog',blogSchema);
export default Blog;