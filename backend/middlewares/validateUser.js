import jwt from 'jsonwebtoken'
import User from '../models/user.schema.js'

// const validateToken = async (req, res, next) => {
//     let token
//     let authHeader = req.headers.Authorization || req.headers.authorization
//     if (authHeader && authHeader.startsWith('Bearer')) {
//         token = authHeader.split(' ')[1]
//         jwt.verify(token, '123', (err, decoded) => {
//             if (err) {
//                 console.error(err)
//                 return res.status(401).json({message: 'Invalid token'})
//             }
//             req.user = decoded.user
//             next()
//         })
//     } else {
//         console.log('User is not authorized')
//         return res
//             .status(401)
//             .json({message: 'User is not authorized or token is missing'})
//     }
// }

const validateToken = async (req, res, next) => {
    const cookie = req.cookies?.userCookie
    console.log(cookie)
    if (cookie) {
        jwt.verify(cookie, '123', (err, decoded) => {
            if (err) {
                return res.sendStatus(403)
            }
            req.user = decoded.user
            next()
        })
    } else {
        res.sendStatus(401)
    }
}

// const validateToken = (req, res) => {
//   const token = req.cookies.userCookie;
// };
export default validateToken
