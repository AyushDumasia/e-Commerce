import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import User from '../models/user.schema.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from './../utils/apiError.js'
import {ApiResponse} from './../utils/ApiResponse.js'
import Address from './../models/address.schema.js'
import Order from './../models/order.schema.js'
const saltRounds = 10
import {getMail} from '../utils/nodemailer.js'
import DailyUser from '../models/dailyActive.schema.js'

//Sign Up , post
export const signUp = asyncHandler(async (req, res) => {
    const {username, email, phone, sex, password} = req?.body
    const validEmail = await User.findOne({email: email})
    if (validEmail) throw new ApiError(409, 'Email already in use')

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
        username,
        email,
        phone,
        sex,
        password: hashedPassword,
    })
    await newUser.save()
    console.log('User saved')
    const accessToken = jwt.sign(
        {
            user: {
                username: newUser.username,
                email: newUser.email,
                id: newUser.id,
            },
        },
        '123',
        {expiresIn: '90m'},
    )

    req.user = {
        username: newUser.username,
        email: newUser.email,
        id: newUser.id,
    }
    console.log('Req  :', req)

    res.cookie('userCookie', accessToken, {
        httpOnly: true,
    })
    console.log('Cookie saved')
    const newDailyUser = new DailyUser({
        userId: req.user.id || 1,
    })
    console.log('User saved')
    await newDailyUser.save()
    const info = getMail(
        newUser.email,
        'Welcome to Our Platform!',
        `Dear ${newUser.username},

    Welcome to e-Commerce! We're thrilled to have you join our community.`,
    )

    console.log('Message sent: %s', info.messageId)

    res.status(201).json(
        new ApiResponse(201, newUser, 'User logged in successfully'),
    )
})

//Log in , post
export const logIn = asyncHandler(async (req, res) => {
    const {email, password} = req?.body
    const user = await User.findOne({email: email})

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new ApiError(401, 'Invalid Details')
    }

    const accessToken = jwt.sign(
        {
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        },
        '123',
        {expiresIn: '90m'},
    )
    req.user = {
        username: user.username,
        email: user.email,
        id: user.id,
    }
    // console.log("Req  :", req);

    const newDailyUser = new DailyUser({
        userId: req.user.id || 1,
    })
    console.log('User saved')
    await newDailyUser.save()
    res.cookie('userCookie', accessToken, {
        httpOnly: true,
    })
        .status(200)
        .json({user, accessToken})
    // console.log(req.user);
})

//Fetch User profile
export const getUserInfo = asyncHandler(async (req, res) => {
    const user = req?.user
    if (!user) {
        return res.status(404).json({message: 'User not found in request'})
    }
    const findUser = await User.findById(user.id)
    const order = await Order.find({userId: user.id}).populate('productId')
    console.log('Order : ', order)
    const address = await Address.find({userId: user.id})
    console.log('Address : ', address)
    if (!findUser) {
        return res.status(404).json({message: 'User not found'})
    }
    res.status(200).json({
        user: findUser,
        order: order,
        address: address,
    })
})

export const updateUser = asyncHandler(async (req, res) => {
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
})

export const currentUser = asyncHandler(async (req, res) => {
    const user = req?.user
    res.status(200).json(user)
    // console.log(user)
})
