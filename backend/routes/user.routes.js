const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const passport = require('passport')

const User = require('../models/user.models.js')
const {signUp, logIn} = require('../controllers/user.controller.js')

router.post('/signup', signUp)

router.post('/login', logIn)

module.exports = router
