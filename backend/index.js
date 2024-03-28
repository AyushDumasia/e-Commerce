import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import connectDB from './db/connectDB.js' //Database connection

//Routes
import userAuthRoutes from './routes/user.routes.js'
import productRoutes from './routes/product.routes.js'

const PORT = 3000
const app = express()

//Middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use((req, res, next) => {
    if (req.path !== '/favicon.ico') {
        console.log(req.method, req.path)
    }
    next()
})

app.use('/api/auth', userAuthRoutes)
app.use('/api/product', productRoutes)

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`)
    connectDB()
})
