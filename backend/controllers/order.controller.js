import {asyncHandler} from './../utils/asyncHandler.js'
import {ApiResponse} from './../utils/ApiResponse.js'
import User from '../models/user.schema.js'
import {ApiError} from '../utils/ApiError.js'
import Cart from '../models/cart.schema.js'
import Order from '../models/order.schema.js'
import Product from './../models/product.schema.js'

// export const createOrder = asyncHandler(async (req, res) => {
//     const userId = req.user.id
//     const user = await User.findById(userId)
//     const productId = req.params.id // Assuming productId is received in params
//     console.log('Product ID:', productId)

//     const product = await Cart.findOne({productId}).populate('productId')
//     console.log('Product:', product)
//     // if (!product) {
//     //     return res.status(404).json({message: 'Product not found'})
//     // }

//     const existingOrder = await Order.findOne({productId})
//     if (existingOrder) {
//         await existingOrder.deleteOne()
//         return res
//             .status(200)
//             .json({message: 'Order deleted', order: existingOrder})
//     }
//     let price = product.productId.price * product.quantity

//     const newOrder = new Order({
//         cartId: product._id,
//         userId: userId,
//         price: price,
//         address: user.address[0],
//     })

//     await newOrder.save()
//     return res.status(200).json({message: 'Order saved'})
// })

export const createOrder = asyncHandler(async (req, res) => {
    const userId = req.user.id

    const user = await User.findOne({_id: userId})

    const cartItems = await Cart.find({userId: userId})

    const orders = []

    for (const cartItem of cartItems) {
        const product = await Cart.findOne({
            productId: cartItem.productId,
        }).populate('productId')
        console.log('Product : ', product)
        let price = parseInt(product.productId.price) * cartItem.quantity
        const newOrder = new Order({
            productId: cartItem.productId._id,
            userId: userId,
            price: price,
            address: user.address[0] || null,
        })
        console.log(cartItem)
        const validOrder = await Order.find({cartId: cartItem._id})
        if (validOrder) {
            await cartItem.deleteOne()
        }

        await newOrder.save()
        orders.push(newOrder)
    }

    res.status(200).json(orders)
})

export const fetchOrder = asyncHandler(async (req, res) => {
    const userId = req.user.id
    const order = await Order.find({userId}).populate('productId')
    console.log('Order : ', order)
    res.status(200).json(order)
})
