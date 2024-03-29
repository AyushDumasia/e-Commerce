import express from 'express'
import asyncHandler from 'async-handler'
import validateToken from './../middlewares/validateUser.js'
import {
    getUserInfo,
    logIn,
    signUp,
    updateUser,
} from '../controllers/user.controller.js'

const router = express.Router()

router.post('/signup', signUp)

router.post('/login', logIn)

router.get('/passInfo', validateToken, getUserInfo)

router.post('/updatePass', updateUser)

export default router
