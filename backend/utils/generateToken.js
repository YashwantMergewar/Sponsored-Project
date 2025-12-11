import jwt from 'jsonwebtoken';

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user.user_id,
            email: user.email,
            role: user.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
        }
    )
}

const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user.user_id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
        }
    )
}

export{
    generateAccessToken,
    generateRefreshToken
}