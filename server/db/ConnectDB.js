import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

// it should be on top before using .env file variables
dotenv.config({});

const url = process.env.MONGODB_URI;

const ConnectionDB = async ()=>{
    
    try {
        const connectionInstance = await mongoose.connect(url);
        console.log(`Connected to mongodb database on host ${connectionInstance.connection.host}`.bgGreen.white);
    } catch (error) {
        console.log(`Mongo connection error`.bgRed.white);
        process.exit(1);
    }
}

export default ConnectionDB;