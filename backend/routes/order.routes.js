import express from 'express'
import validateToken from './../middlewares/validateUser.js'
import {
    addOrder,
    createOrder,
    fetchOrder,
    fetchSpecificOrder,
} from '../controllers/order.controller.js'
const router = express.Router()

router.post('/createOrder', validateToken, createOrder)

router.get('/addOrder/:id', validateToken, addOrder)

router.get('/fetchOrder', validateToken, fetchSpecificOrder)

router.get('/getOrder', fetchOrder)

export default router
