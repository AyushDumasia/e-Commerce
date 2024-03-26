const express = require('express')
const mongoose = require('mongoose')
const Item = require('../models/item.models.js')

const addItem = async (req, res) => {
    try {
        let {productName, category, prize, description, images, gender} =
            req.body
        let postedBy = req
        console.log('postedBy:', postedBy)

        let newItem = new Item({
            // postedBy: postedBy.username,
            productName,
            category,
            prize,
            description,
            images,
            gender,
        })

        await newItem.save()
        console.log('New item saved:', newItem)

        res.status(200).json({message: 'Item added successfully', newItem})
    } catch (error) {
        console.error('Error adding item:', error)
        res.status(500).json({message: 'Server error'})
    }
}

const getItem = async (req, res) => {
    console.log(req.user)
    try {
        const items = await Item.find()
        // console.log(items)
        res.status(200).json(items)
    } catch (error) {
        res.status(500).json(error)
    }
}

const addCart = async (req, res) => {
    let id = req.params
    res.status(200).json(id)
}

module.exports = {addItem, getItem, addCart}
