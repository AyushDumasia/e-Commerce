import express from 'express'
import validateToken from '../middlewares/validateUser.js'
import {
    addCart,
    createProduct,
    fetchProduct,
    getCart,
    showProduct,
    RemoveCart,
} from '../controllers/product.controller.js'
import {validateMerchant} from '../middlewares/authMerchant.js'
import {upload} from './../middlewares/multer.js'
const router = express.Router()

//Create Product
router.post(
    '/createProduct',
    validateToken,
    // validateMerchant,
    upload.single('coverImage'),
    createProduct,
)

//Add to Cart
router.post('/addToCart/:id', validateToken, addCart)

//Remove from Cart
router.post('/removeCart/:id', validateToken, RemoveCart)

//Get Cart
router.get('/cart', validateToken, getCart)

//Home Page
router.get('/fetchProduct', fetchProduct)

//Show Product
router.get('/showProduct/:id', showProduct)

export default router
