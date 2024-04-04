import Feedback from './../models/feedback.schema.js'
import {asyncHandler} from './../utils/asyncHandler.js'
import {ApiError} from './../utils/ApiError.js'
import {ApiResponse} from './../utils/ApiResponse.js'

export const createFeedback = asyncHandler(async (req, res) => {
    const user = req?.user
    if (!user) {
        return res.status(401).json('User is not logged in')
    }

    // console.log(product)
    const newFeedback = new Feedback({
        productId: req.body.productId,
        userId: user.id,
        rating: req.body.rating,
        comment: req.body.comment,
    })
    await newFeedback.save()
    res.status(200).json(newFeedback)
})

export const fetchFeedback = asyncHandler(async (req, res) => {
    const productId = req.params
    console.log(productId.id)

    const feedbacks = await Feedback.find({productId: productId.id}).populate(
        'userId',
    )
    if (!feedbacks) {
        throw new ApiError(404, 'Feedback not found')
    }
    for (let feedback of feedbacks) {
        console.log(feedback.userId.username)
    }
    res.status(200).json(new ApiResponse(201, feedbacks))
})
