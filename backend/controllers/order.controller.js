import {asyncHandler} from './../utils/asyncHandler.js'
import {ApiResponse} from './../utils/ApiResponse.js'
import User from '../models/user.schema.js'
import {ApiError} from '../utils/ApiError.js'
import Cart from '../models/cart.schema.js'
import Order from '../models/order.schema.js'
import Product from './../models/product.schema.js'

export const createOrder = asyncHandler(async (req, res) => {
    const userId = req.user.id

    const user = await User.findOne({_id: userId})

    const cartItems = await Cart.find({userId: userId})

    const orders = []

    for (const cartItem of cartItems) {
        const product = await Cart.findOne({
            productId: cartItem.productId,
        }).populate('productId')
        // console.log('Product : ', product)
        let price = parseInt(product.productId.price) * cartItem.quantity
        const newOrder = new Order({
            productId: cartItem.productId._id,
            userId: userId,
            price: price,
            address: user.address[0] || null,
        })
        // console.log(cartItem)
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
    const order = await Order.find({userId})
        .populate('productId')
        .populate('address')
    console.log(order)
    res.status(200).json({
        order: order,
        address: order?.address,
    })
})

export const addOrder = asyncHandler(async (req, res) => {
    const userId = req.user.id
    const orderId = req.params.id
    const products = await Cart.find({productId: orderId}).populate('productId')
    // console.log(product)
    const order = await Order.findOne({productId: orderId})
    if (order) {
        await order.deleteOne()
        return res.status(201).json('Delete Order')
    } else {
        for (const product of products) {
            let price = parseInt(product.productId.price) * product.quantity
            const newOrder = new Order({
                userId: userId,
                productId: orderId,
                price: price,
                address: null,
            })
            await newOrder.save()
        }
        return res.status(201).json('Order Added')
    }
})
