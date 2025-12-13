import { Router } from "express";
import { verifyJWT } from './../middleware/auth.middleware';
import { deleteVoter, getVoters, updateVoter, voterRegistration } from "../controllers/voterData.controller";

const router = Router()
router.route('/register-voter').post(verifyJWT, voterRegistration);
router.route('/get-voters').get(verifyJWT, getVoters);
router.route('/update-voter').patch(verifyJWT, updateVoter);
router.route('/delete-voter').delete(verifyJWT, deleteVoter);

export default router;