import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { deleteUser, loginUser, logOutUser, registerUser } from "../controllers/user.controller.js";
import { userProfile, editUserProfile, changeUserPassword } from "../controllers/user.controller.js";


const router = Router();
router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/logout').post(verifyJWT, logOutUser);
// Allow fetching current user via cookie (no param) or by id
router.route('/profile').get(verifyJWT, userProfile)
router.route('/profile/:user_id').patch(verifyJWT, editUserProfile);
router.route('/change-password/:user_id').patch(verifyJWT, changeUserPassword);
router.route('/delete-user').delete(verifyJWT, deleteUser);

export default router;