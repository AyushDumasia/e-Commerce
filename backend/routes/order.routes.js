import express from 'express'
import validateToken from './../middlewares/validateUser.js'
import {createOrder, fetchOrder} from '../controllers/order.controller.js'
const router = express.Router()

router.post('/createOrder', validateToken, createOrder)

router.get('/fetchOrder', validateToken, fetchOrder)

export default router
