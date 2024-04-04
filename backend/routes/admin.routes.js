import express from 'express'
const router = express.Router()

import {
    notApprovedProduct,
    showPendingProduct,
    validProduct,
} from '../controllers/admin.controller.js'

router.get('/showPendingProducts', showPendingProduct)

router.post('/validProduct/:id', validProduct)

router.post('/notApproved/:id', notApprovedProduct)

export default router
