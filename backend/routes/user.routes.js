import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { userProfile, editUserProfile, changeUserPassword } from "../controllers/user.controller.js";
import { loginUser, logOutUser, registerUser } from "../controllers/user.controller.js";


const router = Router();
router.route('/login').post(loginUser);
router.route('/profile').get(verifyJWT, userProfile)
router.route('/profile').patch(verifyJWT, editUserProfile);
router.route('/change-password').patch(verifyJWT, changeUserPassword);
router.route('/register').post(registerUser);
router.route('/logout').post(verifyJWT, logOutUser);

export default router;