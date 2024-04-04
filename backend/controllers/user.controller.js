import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import User from '../models/user.schema.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from './../utils/apiError.js'
import {ApiResponse} from './../utils/ApiResponse.js'
const saltRounds = 10

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
    // console.log("Req  :", req);

    res.cookie('userCookie', accessToken, {
        httpOnly: true,
    })

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
        {user: {username: user.username, email: user.email, id: user.id}},
        '123',
        {expiresIn: '90m'},
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
})

export const getUserInfo = asyncHandler(async (req, res) => {
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
