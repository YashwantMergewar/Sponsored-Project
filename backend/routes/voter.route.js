import { Router } from "express";
import { verifyJWT } from './../middleware/auth.middleware.js';
import { deleteVoter, getVoters, updateVoter, voterRegistration } from "../controllers/voterData.controller.js";

const router = Router()
router.route('/register-voter').post(verifyJWT, voterRegistration);
router.route('/get-voters').get(verifyJWT, getVoters);
router.route('/update-voter/:voter_id').patch(verifyJWT, updateVoter);
router.route('/delete-voter/:voter_id').delete(verifyJWT, deleteVoter);

export default router;