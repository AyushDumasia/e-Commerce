import express from 'express'
import validateToken from '../middlewares/validateUser.js'
import {
    addCart,
    createProduct,
    fetchProduct,
    getCart,
    showProduct,
    RemoveCart,
    fetchTempProducts,
    // checkBox,
    sortByCategory,
    suggestions,
    search,
    sortProducts,
    showLatestProducts,
} from '../controllers/product.controller.js'
import {validateMerchant} from '../middlewares/authMerchant.js'
import {upload} from './../middlewares/multer.js'
import {validate} from '../middlewares/zodValidator.js'
import validProduct from '../validators/productValidators.js'
const router = express.Router()

// * Create Product
router.post(
    '/createProduct',
    validateToken,
    validateMerchant,
    upload?.array('images', 10),
    (req, res, next) => {
        req.body.userId = req.user.id
        req.body.images = req.files
        next()
    },
    validate(validProduct),
    createProduct,
)

// * Add to Cart
router.get('/addToCart/:id', validateToken, addCart)

router.get('/showLatestProducts', showLatestProducts)

// * Remove from Cart
router.get('/removeCart/:id', validateToken, RemoveCart)

// * Get Cart
router.get('/cart', validateToken, getCart)

// * Home Page
router.get('/fetchProduct', fetchProduct)

// * Show Product
router.get('/showProduct/:id', showProduct)

// * Fetch Temp products
router.get('/showTempProduct', fetchTempProducts)

// * Suggestions
router.get('/category/:id', suggestions)

// * Sort by category
router.get('/category', sortByCategory)

// * Search
router.get('/search/:searchTerm', search)

// * Sort by Ascending
router.get('/search/:searchTerm/:option', sortProducts)

export default router
