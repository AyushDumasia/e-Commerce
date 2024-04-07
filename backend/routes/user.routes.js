import express from 'express'
import validateToken from './../middlewares/validateUser.js'
import {
    currentUser,
    getUserInfo,
    logIn,
    logOut,
    signUp,
    updateUser,
} from '../controllers/user.controller.js'

const router = express.Router()

router.post('/signup', signUp)

router.post('/login', logIn)

router.get('/logout', logOut)

router.get('/currentUser', validateToken, currentUser)

router.get('/passInfo', validateToken, getUserInfo)

router.post('/updatePass', updateUser)

export default router
