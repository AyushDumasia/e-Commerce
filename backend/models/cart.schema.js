import mongoose from 'mongoose'
const Schema = mongoose.Schema

const cartSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    quantity: {
        type: Number,
        required: true,
    },
})

const Cart = mongoose.model('Cart', cartSchema)

export default Cart
