import express from 'express'
import asyncHandler from 'async-handler'
import validateToken from '../middlewares/validateUser.js'
import {
    addCart,
    createProduct,
    fetchProduct,
    getCart,
    showProduct,
} from '../controllers/product.controller.js'
import {validateMerchant} from '../middlewares/authMerchant.js'
const router = express.Router()

//Create Product
router.post('/createProduct', validateToken, validateMerchant, createProduct)

//Add to Cart
router.post('/addToCart/:id', validateToken, addCart)

//Get Cart
router.get('/cart', validateToken, getCart)

//Home Page
router.get('/fetchProduct', fetchProduct)

//Show Product
router.get('/showProduct/:id', showProduct)

export default router
