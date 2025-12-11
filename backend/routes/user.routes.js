import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { loginUser, logOutUser, registerUser } from "../controllers/user.controller.js";


const router = Router();
router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/logout').post(verifyJWT, logOutUser);

export default router;