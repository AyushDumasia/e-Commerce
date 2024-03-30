import express from 'express'
import validateToken from '../middlewares/validateUser.js'
import {
    addCart,
    createProduct,
    fetchProduct,
    getCart,
    showProduct,
    updateCart,
} from '../controllers/product.controller.js'
import {validateMerchant} from '../middlewares/authMerchant.js'
import {upload} from './../middlewares/multer.js'
const router = express.Router()

//Create Product
router.post(
    '/createProduct',
    validateToken,
    // validateMerchant,
    upload.fields([
        {
            name: 'coverImage',
            maxCount: 1,
        },
        {
            name: 'imageUrls',
            maxCount: 5,
        },
    ]),
    createProduct,
)

//Add to Cart
router.post('/addToCart/:id', validateToken, addCart)

//Update Cart
router.get('/updateCart/:id', validateToken, updateCart)

//Get Cart
router.get('/cart', validateToken, getCart)

//Home Page
router.get('/fetchProduct', fetchProduct)

//Show Product
router.get('/showProduct/:id', showProduct)

export default router
