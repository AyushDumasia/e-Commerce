import express from 'express'
import {checkOut} from '../controllers/payment.controller.js'
import validateToken from './../middlewares/validateUser.js'
const router = express.Router()

router.get('/checkOut', validateToken, checkOut)

export default router
