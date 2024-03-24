const express = require('express')
const mongoose = require('mongoose')

function connectDB() {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => {
            console.log('Connect with server')
        })
        .catch((err) => {
            console.log(err.message)
        })
}

module.exports = connectDB()
