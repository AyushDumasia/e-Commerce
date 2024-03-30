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
        if (validEmail)
            return res.status(401).json({message: 'Email already in use'})
        let hashedPassword = await bcrypt.hash(password, saltRounds)
        const newUser = new User({username, email, password: hashedPassword})
        await newUser.save()
        res.status(200).json({
            email: newUser.email,
            password: newUser.password,
        })
    } catch (err) {
        res.status(401).json({error: err.message})
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
            httpOnly: true,
        })
            .status(200)
            .json({user, accessToken})
        // console.log(req.user);
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({message: 'Internal server error'})
    }
}

export const getUserInfo = async (req, res) => {
    try {
        const user = req.user
        if (!user) {
            return res.status(404).json({message: 'User not found in request'})
        }
        const findUser = await User.findById(user.id)
        if (!findUser) {
            return res.status(404).json({message: 'User not found'})
        }
        res.status(200).json({
            user: findUser,
        })
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({message: 'Internal server error'})
    }
}

export const updateUser = async (req, res) => {
    try {
        const user = req.user
        const email = req.body.email
        const password = req.body.password
        const updateUser = await User.findByIdAndUpdate(
            {_id: user.id},
            {password: password, email: email},
            {new: true},
        )
        if (!updateUser) {
            return res.status(404).json({message: 'User not found'})
        }

        res.status(200).json({
            message: 'User updated successfully',
            user: updateUser,
        })
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({message: 'Internal server error'})
    }
}
