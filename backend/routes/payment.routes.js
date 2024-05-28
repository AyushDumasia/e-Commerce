import express from 'express'
import {
    checkOut,
    getOrderStatus,
    handleStripeWebhook,
} from '../controllers/payment.controller.js'
import validateToken from './../middlewares/validateUser.js'
import bodyParser from 'body-parser'

const router = express.Router()

router.get('/checkOut', validateToken, checkOut)

router.post(
    '/webhook',
    bodyParser.raw({type: 'application/json'}),
    handleStripeWebhook,
)

router.get('/status/:sessionId', getOrderStatus)

export default router
