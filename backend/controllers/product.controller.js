import Product from '../models/product.schema.js'
import User from '../models/user.schema.js'
import Cart from '../models/cart.schema.js'

export const createProduct = async (req, res) => {
    try {
        let {productName, category, description, price} = req.body
        let userId = req.user.id
        let newProduct = new Product({
            productName,
            category,
            description,
            price,
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
        let userId = req.user.id
        let productId = req.params.id
        let quantity = req.body.quantity

        let currUser = await User.findById(userId)
        if (!currUser) {
            return res.status(404).json({message: 'User not found'})
        }

        let item = await Product.findById(productId)
        if (!item) {
            return res.status(404).json({message: 'Product not found'})
        }

        let newCartItem = new Cart({userId, productId, quantity})
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
        let user = req.user
        let findUser = await User.findOne({email: user.email})

        const cartItems = await Cart.find({userId: findUser._id})

        let totalPrice = 0
        for (let cartItem of cartItems) {
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
