import { asyncHandler } from "../utils/asyncHandler.js";
import { userLoginSchema, userRegisterSchema } from "../validationSchema/userValidationSchema.js";
import bcrypt from "bcryptjs"

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, confirmPassword } = req.body

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

    const user = userRegisterSchema.parse({username, email, password, confirmPassword})

    if(!user){
        return res.status(400).json({message: "Invalid user data..!"})
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hashSync(password, salt)
    // Save user to DB logic here
    return res.status(200).json({message: "Registration Successful"})
})


const loginUser = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body
    if(!username && !email){
        return res.status(401).json({message: "username or email is required..!"})
    }

    if(!password){
        return res.status(401).json({message: "password is required..!"})
    }

    const user = userLoginSchema.parse({username, email, password})

    if(!user){
        return res.status(400).json({message: "Invalid user data..!"})
    }
    // compare password
    const verifiedPassword = await bcrypt.compare(password, user.password)
    // Authenticate user logic here
    return res.status(200).json({message: "Login Successful"})

})

export{
    registerUser,
    loginUser
}