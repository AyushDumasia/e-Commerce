import mongoose from 'mongoose'
const Schema = mongoose.Schema

const paymentSchema = new Schema(
    {
        orderId: {
            type: String,
            // type: Schema.Types.ObjectId,
            // ref: 'Order',
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        isPaid: {
            type: Boolean,
            enum: [true, false],
            default: false,
        },
    },
    {
        timestamps: true,
    },
)

const Payment = mongoose.model('Payment', paymentSchema)

export default Payment
