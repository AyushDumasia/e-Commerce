const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema(
    {
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        productName: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        prize: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
        },
        images: {
            type: String,
            // required: true,
        },
        gender: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('Item', itemSchema)
