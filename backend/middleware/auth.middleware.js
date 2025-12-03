import { asyncHandler } from "../utils/asyncHandler";
import { jwt } from 'jsonwebtoken';

export const verifyJWT = asyncHandler(async (req, _, next)=>{
    try {
        const token = req.cookie?.accessToken
        if(!token){
            return res.json(401, "Unauthorized request..!")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        // Fetch User
        // user existance check
    
        req.user = user
        next();
    } catch (error) {
        return res.json(401, error.message || "Unauthorized request..!");
    }
})

