const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')
const Item = require('../models/item.models.js')

const userSchema = new Schema(
    {
        googleId: {
            type: String,
        },
        username: {
            type: String,
        },
        email: {
            type: String,
            required: [true, 'Please add email contact email'],
            unique: [true, 'Email already Register'],
        },
        cart: [
            {
                type: Schema.Types.ObjectId,
                ref: 'item',
            },
        ],
    },
    {
        timestamps: true,
    },
)

// userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema)
