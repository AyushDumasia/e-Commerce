import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import User from '../models/user.schema.js'
const saltRounds = 10

//Sign Up , post
export const signUp = async (req, res) => {
    try {
        const {username, email, phone, sex, password} = req.body
        let validEmail = await User.findOne({email: email})
        if (validEmail) {
            res.status(401).json({message: 'Email already in use'})
        }
        let hashedPassword = await bcrypt.hash(password, saltRounds)
        const newUser = new User({username, email, password: hashedPassword})
        await newUser.save()
        res.status(200).json({
            email: newUser.email,
            password: newUser.password,
        })
    } catch (err) {
        res.status(401).json({error: err.message}) // Send error message in the response
    }
}

//Log in , post
export const logIn = async (req, res) => {
    try {
        let {email, password} = req.body
        let user = await User.findOne({email: email})

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({message: 'Invalid email or password'})
        }

        const accessToken = jwt.sign(
            {user: {username: user.username, email: user.email, id: user.id}},
            '123',
            {expiresIn: '15m'},
        )
        req.user = {
            username: user.username,
            email: user.email,
            id: user.id,
        }
        // console.log("Req  :", req);

        res.cookie('userCookie', accessToken, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
        })

        // console.log(req.user);
        res.status(200).json({status: 201, user, accessToken})
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({message: 'Internal server error'})
    }
}
