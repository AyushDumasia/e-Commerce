import express from 'express'
const router = express.Router()
import {
    becomeMerchant,
    currentMerchant,
} from '../controllers/merchant.controller.js'

import validateToken from './../middlewares/validateUser.js'
import {upload} from '../middlewares/multer.js'

router.post(
    '/becomeMerchant',
    validateToken,
    upload.single('document'),
    becomeMerchant,
)

router.get('/currentMerchant', validateToken, currentMerchant)

export default router
