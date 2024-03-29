import express from 'express'
const router = express.Router()

import {
    showPendingProduct,
    validProduct,
} from '../controllers/admin.controller.js'

router.get('/showPendingProducts', showPendingProduct)

router.post('/validProduct/:id', validProduct)

export default router
