import Feedback from './../models/feedback.schema.js'
import {asyncHandler} from './../utils/asyncHandler.js'
import {ApiError} from './../utils/ApiError.js'
import {ApiResponse} from './../utils/ApiResponse.js'
import Product from '../models/product.schema.js'

// * Create a New Feedback
export const createFeedback = asyncHandler(async (req, res) => {
    const user = req?.user
    if (!user) {
        return res.status(401).json('User is not logged in')
    }

    const newFeedback = new Feedback({
        productId: req.body.productId,
        userId: user.id,
        rating: req.body.rating,
        comment: req.body.comment,
    })
    await newFeedback.save()
    res.status(200).json(
        new ApiResponse(200, newFeedback, 'Feedback saved successfully'),
    )
})

// * Fetch a feedback for a specific product on a product page
export const fetchFeedback = asyncHandler(async (req, res) => {
    const productId = req.params
    const product = await Product.findById(productId.id)
    const feedbacks = await Feedback.find({productId: productId.id}).populate(
        'userId',
    )

    let averageRating = 0

    if (feedbacks.length > 0) {
        let totalRating = 0
        feedbacks.forEach((feedback) => {
            totalRating += feedback.rating
        })
        averageRating = totalRating / feedbacks.length
    } else {
        console.log('No feedback available for this product.')
    }

    product.rating = averageRating

    await product.save()

    res.status(200).json(new ApiResponse(201, feedbacks))
})
