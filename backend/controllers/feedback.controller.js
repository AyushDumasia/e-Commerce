import Feedback from './../models/feedback.schema'

export const createFeedback = async (req, res) => {
    const user = req.user
    const product = req.params
    const newFeedback = new Feedback({
        productId: product,
        userId: user.id,
        rating: req.body.rating,
        comment: req.body.comment,
    })
    await newFeedback.save()
    res.status(200).json(newFeedback)
}

export const fetchFeedback = async (req, res) => {
    const product = req.params.id
    const feedbacks = await Feedback.findById(product)
    if (!feedbacks) {
        res.status(200).json({message: 'No feedback found for this product'})
    }
    res.status(200).json(feedbacks)
}
