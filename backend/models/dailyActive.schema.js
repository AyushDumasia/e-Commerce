import mongoose from 'mongoose'
const Schema = mongoose.Schema

const dailyUser = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    },
)

const DailyUser = mongoose.model('DailyUser', dailyUser)

export default DailyUser
