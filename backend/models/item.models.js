const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema(
    {
        posted_By: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        name: {
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
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('Item', itemSchema)
