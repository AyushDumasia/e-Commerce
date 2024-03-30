import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js' //Database connection

//Routes
import userAuthRoutes from './routes/user.routes.js'
import productRoutes from './routes/product.routes.js'
import merchantRoutes from './routes/merchant.routes.js'
import adminRoutes from './routes/admin.routes.js'
const PORT = process.env.PORT || 3000
const app = express()

//Middlewares
dotenv.config({
    path: './.env',
})
app.use(express.urlencoded({extended: true, limit: '16kb'}))
app.use(express.static('public'))
app.use(express.json({limit: '16kb'}))
app.use(cookieParser())

//Cors Configuration
const corsOptions = {
    origin: function (origin, callback) {
        callback(
            null,
            (origin && origin.startsWith(process.env.CORS_ORIGIN)) || '*',
        )
    },
    credentials: true,
}
app.use(cors(corsOptions))

app.use((req, res, next) => {
    if (req.path !== '/favicon.ico') {
        console.log(req.method, req.path)
    }
    next()
})

app.use('/api/auth', userAuthRoutes)
app.use('/api/merchant', merchantRoutes)
app.use('/api/product', productRoutes)
app.use('/api/admin', adminRoutes)

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`)
    connectDB()
})
