import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { loginUser, logOutUser, registerUser } from "../controllers/user.controller.js";
import { userProfile, editUserProfile, changeUserPassword } from "../controllers/user.controller.js";


const router = Router();
router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/logout').post(verifyJWT, logOutUser);
router.route('/profile/:user_id').get(verifyJWT, userProfile)
router.route('/profile/:user_id').patch(verifyJWT, editUserProfile);
router.route('/change-password/:user_id').patch(verifyJWT, changeUserPassword);

export default router;