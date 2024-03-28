import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.schema.js'
const authenticate = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization

        const verifytoken = jwt.verify(accessToken, keysecret)

        const rootUser = await User.findOne({_id: verifytoken._id})

        if (!rootUser) {
            throw new Error('user not found')
        }

        req.token = accessToken
        req.rootUser = rootUser
        req.userId = rootUser._id

        next()
    } catch (error) {
        res.status(401).json({
            status: 401,
            message: 'Unauthorized no token provide',
        })
    }
}

export default authenticate
