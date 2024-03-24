const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const User = require('./models/user.models.js')
const userRoutes = require('./routes/user.routes.js')
// const {connectDB} = require('./db/connectDB.js')

dotenv.config()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

// Passport Configuration
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// Routes
app.use('/', userRoutes)

// Connect to MongoDB
app.listen(PORT, async () => {
    console.log(`App is listening on ${PORT} port`)
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => {
            console.log('Connect with server')
        })
        .catch((err) => {
            console.log(err.message)
        })
})
