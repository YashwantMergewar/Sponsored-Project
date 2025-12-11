import { asyncHandler } from "../utils/asyncHandler.js";
import { userLoginSchema, userRegisterSchema } from "../utils/validationSchema/userValidationSchema.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs"
import conn from './../config/db.js';

const generateAccessAndRefreshToken = async (userId) => {
    //fetch user from DB
    const [user] = await conn.query('select * from users where user_id = ?', [userId])
    //generate access token
    const accessToken = generateAccessToken(user[0])
    const refreshToken = generateRefreshToken(user[0])

    //update refresh token in DB
    const isUpdated = await conn.query('update users set refreshToken = ? where user_id = ?', [refreshToken, userId])
    if(!isUpdated){
        throw new Error("Unable to update refresh token..!")
    }

    return {
        accessToken,
        refreshToken
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, confirmPassword, role } = req.body

    if(!username && !email){
        return res.status(401).json({message: "username or email is required..!"})
    }

    if(!password){
        return res.status(401).json({message: "password is required..!"})
    }

    if(!confirmPassword){
        return res.status(401).json({message: "Confirm password is required..!"})
    }

    if(password !== confirmPassword){
        return res.status(400).json({message: "Password and Confirm Password do not match..!"})
    }

    if(role !== 'user' && role !== 'admin'){
        return res.status(400).json({
            message: "Invalid role specified..!"
        })
    }

    const user = userRegisterSchema.parse({username, email, password, confirmPassword})

    if(!user){
        return res.status(400).json({message: "Invalid user data..!"})
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hashSync(password, salt)
    // Save user to DB logic here
    await conn.query('insert into users (username, password_hash, email, role) values (?, ?, ?, ?)', [username, hashedPassword, email, role])
    return res.status(200).json({
        message: "Registration Successful",
        userId: user.user_id
    })
})


const loginUser = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body
    try {
        if(!username && !email){
            return res.status(401).json({message: "username or email is required..!"})
        }
    
        if(!password){
            return res.status(401).json({message: "password is required..!"})
        }
    
        const userValid = userLoginSchema.parse({username, email, password})
    
        if(!userValid){
            return res.status(400).json({message: "Invalid user data..!"})
        }
    
        const [user] = await conn.query('select * from users where username = ? or email = ?', [username, email])
        // console.log(user);
        if(user.length === 0){
            return res.status(401).json({
                message: "User not found..!"
            })
        }
        // compare password
        const verifiedPassword = await bcrypt.compare(password, user[0].password_hash)
        // Authenticate user logic here
        if(!verifiedPassword){
            return res.status(401).json({
                message: "Password doesn't match..!"
            })
        }
        
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user[0].user_id)
        const option = {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000 
        }

        res.cookie("accessToken", accessToken, option)
        res.cookie("refreshToken", refreshToken, option)
        
        return res.status(200)
        .json({
            message: "Login Successful",
            user: {
                id: user[0].user_id,
                username: user[0].username,
                role: user[0].role
            }
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message || "Login failed..!"
        })
    }

})


const logOutUser = asyncHandler(async (req, res) => {
  try {
      const { user_id } = req.user
      // Logout user logic here
      res.clearCookie("accessToken")
      res.clearCookie("refreshToken")
      // remove refresh token from DB
      await conn.query('update users set refreshToken = null where user_id = ?', [user_id])
      return res.status(200).json({
          message: "logout successful"
      })
  } catch (error) {
    return res.status(500).json({
        message: error.message || "Logout failed..!"
    })
  }
})

export{
    registerUser,
    loginUser,
    logOutUser
}