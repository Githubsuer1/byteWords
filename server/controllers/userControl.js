import User from '../models/userModel.js'
import bcrypt from 'bcrypt';
import { generateToken } from '../utills/generateToken.js';

const userControl = {
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;

            // existing user
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.json({
                    success: false,
                    message: "Email already registered"
                })
            };

            // encrypting and storing the password using bcrypt package
            const encryptedPass = await bcrypt.hash(password, 10);
            const newUser = new User({ username, email, password: encryptedPass });
            const savedUser = await newUser.save();

            // returning the response to client
            return res.status(201).json({
                success: true,
                message: "User registered successfully",
                user: {
                    _id: savedUser._id,
                    username: savedUser.username,
                    email: savedUser.email
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error",
                success: false,
                error: error
            })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // validation
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password",
                })
            };

            // password match
            const equalPass = await bcrypt.compare(password, user.password);
            if (!equalPass) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password",
                })
            }

            // generating token
            const token = generateToken(user._id);


            // successfull login response
            return res.status(200).json({
                success: true,
                message: "Login successfull",
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            });

        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error",
                success: false,
                error: error
            })

        }
    },
    getUser: async (req, res) => {
        try {
            const user = await User.find({}).select('-password')
            return res.status(200).json({
                success: true,
                message: "Users fetched successfully",
                user
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            })
        }
    }
}

export default userControl;