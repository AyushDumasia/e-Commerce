import mongoose from 'mongoose'
const Schema = mongoose.Schema

const orderSchema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        address: {
            type: Schema.Types.ObjectId,
            ref: 'Address',
            // required: true,
        },
    },
    {
        timestamps: true,
    },
)

const Order = mongoose.model('Order', orderSchema)

export default Order
