import { asyncHandler } from "../utils/asyncHandler.js";
import { updateUserProfileSchema, userLoginSchema, userPasswordSchema, userRegisterSchema } from "../utils/validationSchema/userValidationSchema.js";
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
    const { fullname, username, email, password, confirmPassword } = req.body

    if(fullname && fullname.trim() === ''){
        return res.status(401).json({
            message: "Fullname is required..!"
        })
    }

    if(!username && !email){
        return res.status(401).json({message: "username or email is required..!"})
    }

    const [existingUsers] = await conn.query('select * from users where username = ? or email = ?', [username, email])

    if(existingUsers.length > 0){
        return res.status(409).json({
            message: "User with given username or email already exists..! You can't create account..!"
        })
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

    const user = userRegisterSchema.parse({fullname, username, email, password, confirmPassword})

    if(!user){
        return res.status(400).json({message: "Invalid user data..!"})
    }

    const [result] = await conn.query('select * from users');
    if(result.length > 0){
        return res.status(401).json({
            message: "Not Allow to create account..! Another user has a role of admin"
        })
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hashSync(password, salt)
    // Save user to DB logic here
    await conn.query('insert into users (fullname, username, password_hash, email) values (?, ?, ?, ?)', [fullname, username, hashedPassword, email])
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
                fullname: user[0].fullname,
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

const userProfile = asyncHandler(async (req, res) => {
    // Prefer route param, otherwise fall back to the authenticated user from verifyJWT
    const user_id = req.params?.user_id || req.user?.user_id;

    if(!user_id){
        return res.status(400).json({ message: 'user_id is required' })
    }

    const [user] = await conn.query('select fullname, username, email, role from users where user_id = ?', [user_id])

    if(!user || user.length === 0){
        return res.status(404).json({
            message: "User not found..!"
        })
    }

    return res.status(200).json({
        message: "User profile fetched successfully",
        user: user[0]
    })
})

const editUserProfile = asyncHandler(async (req, res) => {
    const user_id =  req.user?.user_id || req.params?.user_id;
    if(user_id === undefined || user_id === null){
        console.log("Id not found...");
    }

    const { fullname, username, email } = req.body
    try {
        let fields = []
        let values = []
        // validate safely and return errors as 400 instead of throwing
        const validatedData = updateUserProfileSchema.safeParse({ fullname, username, email })
        if(!validatedData.success){
            return res.status(400).json({
                message: "Invalid data provided..!",
                errors: validatedData.error?.format?.() || validatedData.error
            })
        }
    
        if(fullname){
            fields.push("fullname = ?")
            values.push(fullname)
        }

        if(username){
            fields.push("username = ?")
            values.push(username)
        }

        if(email){
            fields.push("email = ?")
            values.push(email)
        }

        // prevent running an invalid UPDATE with no SET clauses
        if (fields.length === 0) {
            return res.status(400).json({
                message: "No valid fields provided for update..!"
            })
        }
        
        values.push(user_id)
        const sql = `update users set ${fields.join(', ')} where user_id = ?`;
    
        const updatedUser = await conn.query(sql, values)
    
        if(!updatedUser){
            return res.status(500).json({
                message: "Unable to update user profile..!"
            })
        }

        return res.status(200).json({
            message: "User profile updated successfully..!",
            user: {
                fullname,
                username,
                email
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Unable to update user profile..!"
        })
    }
})

const changeUserPassword = asyncHandler(async (req, res) => {
    // route param or the authenticated user's id (from middleware)
    const user_id = Number(req.user?.user_id ?? req.params?.user_id)
    const { oldPassword, newPassword, confirmPassword } = req.body

    if(!oldPassword || !newPassword || !confirmPassword){
        return res.status(400).json({
            message: "All password fields are required..!"
        })
    }

    userPasswordSchema.parse({ oldPassword, newPassword, confirmPassword })

    const [user] = await conn.query('select * from users where user_id = ?', [user_id])

    const isMatch  = await bcrypt.compare(oldPassword, user[0].password_hash)

    if(!isMatch){
        return res.status(401).json({
            message: "Old password is incorrect..!"
        })
    }

    // normalize types: user[0].user_id may be a number, user_id is already coerced to number above
    if(user[0].user_id !== user_id){
        return res.status(403).json({
            message: "This password change request is not authorized..!"
        })
    }

    if(newPassword !== confirmPassword){
        return res.status(400).json({
            message: "New password and confirm password do not match..!"
        })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hashSync(newPassword, salt)
    const updatedPassword = await conn.query('update users set password_hash = ? where user_id = ?', [hashedPassword, user_id])

    if(!updatedPassword){
        return res.status(500).json({
            message: "Unable to update password..!"
        })
    }

    return res.status(200).json({
        message: "Password updated successfully..!"
    })
})

const deleteUser = async (req, res) => {
    const user_id = req.params.user_id || req.user?.user_id
    try {
        const result = await conn.query('delete from users where user_id = ?', [user_id])
        if(result.affectedRows === 0){
            return res.status(404).json({
                message: "User not found..!"
            })
        }
        if(!result){
            return res.status(500).json({
                message: "Unable to delete user..!"
            })
        }

        return res.status(200).json({
            message: "User deleted successfully..!"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Unable to delete user..!"
        })
    }
}

export{
    registerUser,
    loginUser,
    logOutUser,
    userProfile,
    editUserProfile,
    changeUserPassword,
    deleteUser
}