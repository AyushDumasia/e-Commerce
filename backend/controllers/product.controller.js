import Product from '../models/product.schema.js'
import User from '../models/user.schema.js'
import Cart from '../models/cart.schema.js'
// import cloudinary from 'cloudinary'
// import {v2 as cloudinary} from 'cloudinary'

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_API_KEY,
//     api_secret: process.env.CLOUD_API_SECRET,
// })

export const fetchProduct = async (req, res) => {
    const product = await Product.find()
    res.status(200).json(product)
}

export const showProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findById(id).populate('userId')
        res.status(200).json({
            product: product,
            userId: product.userId.username,
        })
    } catch (err) {
        console.log(err)
    }
}

export const createProduct = async (req, res) => {
    try {
        const {productName, category, description, price} = req.body
        const userId = req.user.id
        // const uploadedImages = []
        // for (const file of req.files) {
        //     const result = await cloudinary.uploader.upload(file.path)
        //     uploadedImages.push(result.secure_url)
        // }
        const newProduct = new Product({
            productName,
            category,
            description,
            price,
            // imageUrls: uploadedImages,
            userId,
        })
        await newProduct.save()
        res.status(200).json({user: newProduct})
    } catch (error) {
        console.error('Error creating product:', error)
        res.status(500).json({message: 'Internal server error'})
    }
}

export const addCart = async (req, res) => {
    try {
        const userId = req.user.id
        const productId = req.params.id
        const quantity = req.body.quantity

        const currUser = await User.findById(userId)
        if (!currUser) {
            return res.status(404).json({message: 'User not found'})
        }

        const item = await Product.findById(productId)
        if (!item) {
            return res.status(404).json({message: 'Product not found'})
        }

        const newCartItem = new Cart({userId, productId, quantity})
        await newCartItem.save()

        currUser.cart.push(newCartItem)
        await currUser.save()

        res.status(200).json({message: 'Item added to cart successfully'})
    } catch (error) {
        console.error('Error adding item to cart:', error)
        res.status(500).json({message: 'Internal server error'})
    }
}

export const getCart = async (req, res) => {
    try {
        const user = req.user
        const findUser = await User.findOne({_id: user.id})
        if (!findUser) {
            return res.status(404).json({message: 'User not found'})
        }

        const cartItems = await Cart.find({userId: findUser._id})
        if (!cartItems) {
            return res.status(404).json({message: 'Cart items not found'})
        }

        let totalPrice = 0
        for (const cartItem of cartItems) {
            const product = await Product.findById(cartItem.productId)
            if (product) {
                totalPrice += parseFloat(product.price) * cartItem.quantity
            }
        }

        res.status(200).json({
            count: cartItems.length,
            cartItems: cartItems,
            totalPrice: totalPrice.toFixed(2),
        })
    } catch (error) {
        console.error('Error fetching cart items:', error)
        res.status(500).json({message: 'Internal server error'})
    }
}
