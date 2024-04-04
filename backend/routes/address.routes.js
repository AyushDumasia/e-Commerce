import express from 'express'
import validateToken from './../middlewares/validateUser.js'
import {fetchAddress, mergeAddress} from '../controllers/address.controller.js'
const router = express.Router()

router.post('/createAddress', validateToken, mergeAddress)

router.get('/fetchAddress', validateToken, fetchAddress)

export default router
