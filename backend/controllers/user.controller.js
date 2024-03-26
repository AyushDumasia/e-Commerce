const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const User = require('../models/user.models.js')

const signUp = async (req, res) => {
    try {
        let {googleId, username, email, password} = req.body
        let newUser = new User({username, email})
        let registerUser = await User.register(newUser, password)
        console.log(registerUser)
    } catch (err) {
        console.log(err.message)
    }
}

const logIn =
    (passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/log-in',
        failureFlash: true,
    }),
    (req, res) => {
        console.log(currUser)
        res.json({message: 'Login successful'})
    })

module.exports = {signUp, logIn}
