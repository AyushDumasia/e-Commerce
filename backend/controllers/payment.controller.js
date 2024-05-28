import Stripe from 'stripe'
import {asyncHandler} from './../utils/asyncHandler.js'
import User from './../models/user.schema.js'
import Order from './../models/order.schema.js'
import Payment from './../models/payment.schema.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const checkOut = asyncHandler(async (req, res) => {
    const userId = req?.user?.id
    if (!userId) {
        return res.status(400).json({
            success: false,
            message: 'User ID is required.',
        })
    }

    const user = await User.findById(userId)
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found.',
        })
    }

    const recentOrder = await Order.findOne({userId: user._id})
        .sort({createdAt: -1})
        .populate('productId')
        .populate('userId')
        .populate('address')

    if (!recentOrder) {
        return res.status(404).json({
            success: false,
            message: 'No recent order found for this user.',
        })
    }

    const orderId = recentOrder.orderId
    const products = await Order.find({orderId: orderId}).populate('productId')

    const productNames = products.map(
        (product) => product.productId.productName,
    )

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

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `${process.env.CLIENT_SIDE}/checkout-success`,
        cancel_url: `${process.env.CLIENT_SIDE}/checkout-cancel`,
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

    const sessionData = new Payment({
        sessionId: session.id,
        userId: user._id,
        orderId: orderId,
    })
    await sessionData.save()

    res.status(200).json({
        success: true,
        session,
        productNames,
    })
})

export const handleStripeWebhook = asyncHandler(async (req, res) => {
    const sig = req.headers['stripe-signature']

    let event
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_SECRET_KEY,
        )
    } catch (err) {
        console.error('Webhook signature verification failed.', err)
        return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object

        // Find and update the corresponding payment record in your database
        try {
            const payment = await Payment.findOneAndUpdate(
                {sessionId: session.id},
                {isPaid: true},
                {new: true},
            )

            if (!payment) {
                return res
                    .status(404)
                    .json({message: 'Payment record not found'})
            }

            res.status(200).json({received: true})
        } catch (error) {
            console.error('Error updating payment record:', error)
            res.status(500).json({message: 'Internal Server Error'})
        }
    } else {
        res.status(400).end()
    }
})

export const getOrderStatus = async (req, res) => {
    const {sessionId} = req.params

    try {
        const order = await Order.findOne()
        if (!order) {
            return res.status(404).json({message: 'Order not found'})
        }

        return res.json({status: order.status})
    } catch (err) {
        console.error('Error fetching order status:', err)
        res.status(500).json({message: 'Internal Server Error'})
    }
}
