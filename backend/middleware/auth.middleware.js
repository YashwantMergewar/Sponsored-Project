import conn from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';

export const verifyJWT = asyncHandler(async (req, res, next)=>{
    try {
        const token = req.cookies?.accessToken
        // // token should be a string in JWT format (header.payload.signature)
        // if(!token || typeof token !== 'string'){
        //     return res.status(401).json({message: "Unauthorized request..! token missing or invalid"})
        // }

        // // quick format check to avoid jwt malformed errors
        // const parts = token.split('.')
        // if(parts.length !== 3){
        //     console.log('verifyJWT: malformed token received:', token)
        //     return res.status(400).json({ message: 'Malformed token' })
        // }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if(!decodedToken){
            return res.status(400)
            .json({
                message: "Token is not verified..!"
            })
        }
        // Fetch User
        const [user] = await conn.query('select * from users where user_id = ?', [decodedToken.id])
        // user existance check
        if(!user){
            return res.status(401).json({
                message: "Unauthorized request..!"
            })
        }
    
        // store the user object (first row) on the request for convenience
        req.user = user && user[0]
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: error.message || "Unauthorized request..!"});
    }
})

