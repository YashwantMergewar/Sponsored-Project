const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.userEmail,
            fullname: user.fullname
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
            id: user.id,
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