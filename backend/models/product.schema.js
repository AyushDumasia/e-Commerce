import mongoose from 'mongoose'
const Schema = mongoose.Schema

const productSchema = new Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        coverImage: {
            type: String,
            required: true,
        },
        imageUrls: {
            type: [String],
            // required: true,
        },
        price: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

const Product = mongoose.model('Product', productSchema)

export default Product
