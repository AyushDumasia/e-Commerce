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

router.get('/showPendingProducts', showPendingProduct)

router.post('/validProduct/:id', validProduct)

router.post('/notApproved/:id', notApprovedProduct)

router.get('/dailyUser', dailyUser)

export default router
