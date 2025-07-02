import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();


const ensureAuthentication = async (req, res, next) => {

    try {
        const token = req.headers.authorization; 
        if (!token) {
            return res.status(403).
                json({
                    message: "Unauthorized, JWT token is required"
                });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password"); // attach user to req
        // console.log(req.user);
        next();
    } catch (error) {
        return res.status(403).
            json({
                message: "Unauthorized, JWT token worng or expired!"
            });
    }
}

export default ensureAuthentication;