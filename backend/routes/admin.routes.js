import express from 'express'
const router = express.Router()
import moment from 'moment'

import validateToken from './../middlewares/validateUser.js'
import {
    dailyUser,
    notApprovedProduct,
    showPendingProduct,
    validProduct,
} from '../controllers/admin.controller.js'
import DailyUser from '../models/dailyActive.schema.js'

// * Show a pending product for an approval
router.get('/showPendingProducts', showPendingProduct)

// * Approve a product
router.post('/validProduct/:id', validProduct)

// * Not approve a product
router.post('/notApproved/:id', notApprovedProduct)

router.get('/dailyUser', dailyUser)

export default router
