const express = require('express')
const mongoose = require('mongoose')
const {addItem, getItem, addCart} = require('../controllers/item.controller')
const isLoggedIn = require('../middlewares/isLoggedIn')
const router = express.Router()

router.post('/addItem', addItem)

router.get('/showItem', getItem)

router.patch('/addCart/:id', addCart)

module.exports = router
