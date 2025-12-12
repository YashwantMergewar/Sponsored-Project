import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { loginUser } from "../controllers/user.controller.js";
import { userProfile, editUserProfile, changeUserPassword } from "../controllers/user.controller.js";


const router = Router();
router.route('/login').post(loginUser);
router.route('/profile').get(verifyJWT, userProfile)
router.route('/profile').patch(verifyJWT, editUserProfile);
router.route('/change-password').patch(verifyJWT, changeUserPassword);

export default router;