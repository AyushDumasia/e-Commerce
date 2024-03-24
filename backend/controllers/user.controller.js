const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const User = require('../models/user.models.js')

const signUp = async (req, res) => {
    let {username, email, phone, password} = req.body
    let newUser = new User({username, email, phone})
    let registerUser = await User.register(newUser, password)
    console.log(registerUser)
}

const logIn = passport.authenticate('local', {
    failureRedirect: '/log-in',
    failureFlash: true,
})
;async (req, res) => {
    let {username, password} = req.body
    res.json({
        username,
        password,
    })
}

module.exports = {signUp, logIn}
