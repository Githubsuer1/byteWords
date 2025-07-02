import express from 'express';
import userControl from '../controllers/userControl.js';
import {loginValidation,registerValidation} from '../middlewares/userValidation.js';


const router = express.Router();

router.route('/register').post(registerValidation, userControl.register);
router.route('/getUser').get(userControl.getUser);
router.route('/login').post(loginValidation,userControl.login);




export default router;