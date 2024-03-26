const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const OAuth2Strategy = require('passport-google-oauth2').Strategy
const LocalStrategy = require('passport-local')
const bodyParser = require('body-parser')
const session = require('express-session')
const dotenv = require('dotenv')
const cors = require('cors')
const User = require('./models/user.models.js')
const userRoutes = require('./routes/user.routes.js')
const itemRoutes = require('./routes/item.routes.js')
// const {connectDB} = require('./db/connectDB.js')

dotenv.config()
const PORT = process.env.PORT || 3000
const clientId =
    '792889636083-d73apctca50phmsutvgoc5vqq3bmalgr.apps.googleusercontent.com'
const clientSecret = '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'

const sessionOption = {
    secret: '123ayush5871541544448918978818dumasia105459487',
    resave: false,
    saveUninitialized: true,
}

app.use(session(sessionOption))
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}

app.use(cors(corsOptions))
// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
    res.locals.currUser = req.user
    next()
})

// Passport Configuration
app.use(passport.initialize())
app.use(passport.session())
passport.use(
    new OAuth2Strategy(
        {
            clientID: clientId,
            clientSecret: clientSecret,
            callbackURL: '/auth/google/callback',
            scope: ['profile', 'email'],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({googleId: profile.id})
                if (!user) {
                    user = new User({
                        googleId: profile.id,
                        username: profile.displayName,
                        email: profile.emails[0].value,
                    })
                    await user.save()
                    console.log(profile)
                }
                return done(null, user)
            } catch (err) {
                return done(err)
            }
        },
    ),
)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
    // done(null, user)
})

// Routes
// app.use('/api/user', userRoutes)
app.use('/api/item', itemRoutes)

app.get(
    '/auth/google',
    passport.authenticate('google', {scope: ['profile ', 'email']}),
)

app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: 'http://localhost:5173/',
        failureRedirect: 'http://localhost:5000/login',
    }),
)

app.get('/success', (req, res) => {
    console.log('req ' + req.user)

    if (req.user) {
        res.status(200).json({message: 'User Logged In', user: req.user})
    } else {
        res.status(404).json('Not Found')
    }
})

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
