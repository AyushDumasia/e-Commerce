import mongoose from 'mongoose'

const connectDB = () => {
    mongoose
        .connect('mongodb://127.0.0.1:27017/e-Commerce')
        .then(() => {
            console.log('Connect with Databases')
        })
        .catch((err) => {
            console.log('Error connecting with Database')
        })
}

export default connectDB
