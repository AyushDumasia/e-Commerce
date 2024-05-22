import Stripe from 'stripe'
import {asyncHandler} from './../utils/asyncHandler.js'
import User from './../models/user.schema.js'
import Order from './../models/order.schema.js'
import Payment from './../models/payment.schema.js'
import mongoose from 'mongoose'

export const checkOut = asyncHandler(async (req, res) => {
    const userId = req?.user.id

    const user = await User.findById(userId)

    const recentOrder = await Order.findOne({userId: user._id})
        .sort({createdAt: -1})
        .populate('productId')
        .populate('userId')

    if (!recentOrder) {
        return res.status(404).json({
            success: false,
            message: 'No recent order found for this user.',
        })
    }

    const orderId = recentOrder.orderId
    const products = await Order.find({orderId: orderId}).populate('productId')

    const productNames = []

    for (const product of products) {
        productNames.push(product.productId.productName)

        const newPayment = new Payment({
            orderId: product.orderId,
            userId: user._id,
            isPaid: true,
        })
        await newPayment.save()
    }

    const lineItems = products.map((product) => ({
        price_data: {
            currency: 'inr',
            product_data: {
                name: product.productId.productName,
            },
            unit_amount: product.price * 100,
        },
        quantity: 1,
    }))

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `${process.env.CORS_ORIGIN}/checkout-success`,
        cancel_url: `${process.env.CORS_ORIGIN}/checkout-cancel`,
        line_items: lineItems,
        shipping_address_collection: {
            allowed_countries: [
                'US',
                'CA',
                'GB',
                'AU',
                'SG',
                'FR',
                'DE',
                'JP',
                'BR',
                'ZA',
            ],
        },
        billing_address_collection: 'required',
        customer_email: user.email,
    })

    res.status(200).json({
        success: true,
        session,
        productNames,
    })
})
