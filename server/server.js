// 1. Importing modules

import express from 'express';
import ConnectionDB from './db/ConnectDB.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import colors from 'colors';

// configuring dotenv to easily access the environment variables.
dotenv.config()



// 2. creating instance of express and accessing the port from .env file
const app = express();
const PORT = process.env.PORT || 8000;



// 3. Middlewares (must be before routes)
app.use(express.json()); //  Needed for JSON POST bodies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));



// 4. Successful database connection will start the server
ConnectionDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server is listening on ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`.bgMagenta.blue)
        })
    })
    .catch((error) => {
        console.log(error);
    })



// 5. routing on specified routes
import userRouter from './routes/userRoute.js'
app.use('/api/v1/users', userRouter);

import blogRouter from './routes/blogRoute.js';
app.use('/api/v1/blogs',blogRouter);