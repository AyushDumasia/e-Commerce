import express from 'express'
import validateToken from '../middlewares/validateUser.js'
import {
    addCart,
    createProduct,
    getCart,
} from '../controllers/product.controller.js'
const router = express.Router()

//Create Product
router.post('/createProduct', validateToken, createProduct)

//Add to Cart
router.post('/addToCart/:id', validateToken, addCart)

//Get Cart
router.get('/cart', validateToken, getCart)

export default router
