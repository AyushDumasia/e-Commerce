import jwt from 'jsonwebtoken'
import User from '../models/user.schema.js'

const validateToken = async (req, res, next) => {
    let token
    let authHeader = req.headers.Authorization || req.headers.authorization
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1]
        jwt.verify(token, '123', (err, decoded) => {
            if (err) {
                res.status(401)
                throw new Error('User is not authorized')
            }
            req.user = decoded.user
            next()
        })
    } else {
        res.status(401)
        throw new Error('User is not authorized or token is missing')
    }
}

// const validateToken = (req, res, next) => {
//   const token = req.cookies.userCookie;
//   console.log(token);
//   if (token) {
//     jwt.verify(token, "123", (err, decoded) => {
//       if (err) {
//         return res.sendStatus(403);
//       }
//       req.user = decoded;
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };

// const validateToken = (req, res) => {
//   const token = req.cookies.userCookie;
// };
export default validateToken
