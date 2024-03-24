const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const passport = require('passport')

const User = require('../models/user.models.js')
const {signUp, logIn} = require('../controllers/user.controller.js')

router.post('/sign-up', signUp)

router.post('/log-in', logIn)

module.exports = router
