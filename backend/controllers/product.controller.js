import Product from '../models/product.schema.js'
import User from '../models/user.schema.js'
import Cart from '../models/cart.schema.js'
import TempProduct from '../models/pendingProduct.schema.js'
import {asyncHandler} from './../utils/asyncHandler.js'
import {ApiError} from './../utils/ApiError.js'
import {uploadOnCloudinary} from './../utils/cloudinary.js'
import {ApiResponse} from './../utils/ApiResponse.js'

export const fetchProduct = asyncHandler(async (req, res) => {
    const product = await Product.find()
    res.status(200).json(
        new ApiResponse(200, product, 'Data fetched successfully'),
    )
})

export const showProduct = asyncHandler(async (req, res) => {
    const id = req.params.id
    const product = await Product.findById(id).populate('userId')
    res.status(200).json({
        product: product,
        userId: product.userId.username,
    })
})

export const createProduct = asyncHandler(async (req, res) => {
    const {productName, category, description, price} = req.body
    const userId = req.user.id
    const coverImageLocalPath = req.files?.coverImage[0]?.path
    const imageLocalPath = req.files?.imageUrls[0]?.path
    if (!coverImageLocalPath || !imageLocalPath) {
        throw new ApiError(400, 'Both images required')
    }
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    const imageUrls = await uploadOnCloudinary(imageLocalPath)

    if (!coverImage || !imageUrls) {
        throw new ApiError(400, 'Both images required')
    }
    console.log('Req Files : ' + req.file)
    const newProduct = new TempProduct({
        productName,
        category,
        description,
        price,
        coverImage: coverImage.url,
        imageUrls: imageUrls?.url || '',
        userId,
    })
    await newProduct.save()
    res.status(200).json(new ApiResponse(200, newProduct))
})

//Add Product to cart
export const addCart = asyncHandler(async (req, res) => {
    const userId = req.user.id
    const productId = req.params.id
    const quantity = 1

    const currUser = await User.findById(userId)
    if (!currUser) {
        return res.status(404).json({message: 'User not found'})
    }

    const item = await Product.findById(productId)
    if (!item) {
        return res.status(404).json({message: 'Product not found'})
    }

    const newCartItem = new Cart({userId, productId, quantity})
    await newCartItem.save()

    currUser.cart.push(newCartItem)
    await currUser.save()

    res.status(200).json(
        new ApiResponse(200, 'Item added to cart successfully'),
    )
})

//Update Cart

export const updateCart = asyncHandler(async (req, res) => {
    const userId = req.user || 'USER_NOT_FOUND'
    const productId = req.params.id
    const quantity = req.body.quantity || 1
    const validProduct = await Product.find({_id: productId})
    if (!validProduct) {
        quantity = 1
        const newCartItem = new Cart({userId, productId, quantity})
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    newCartItem,
                    'Product not in cart , increase 1',
                ),
            )
    }
    console.log(userId, productId, quantity)

    const product = await Cart.findByIdAndUpdate(
        {_id: productId},
        {quantity: quantity},
        {new: true},
    )
    await product.save()

    res.status(200).json(
        new ApiResponse(200, product, 'Cart successfully updated'),
    )
})

export const getCart = asyncHandler(async (req, res) => {
    const user = req.user
    const findUser = await User.findOne({_id: user.id})
    if (!findUser) {
        return res.status(404).json({message: 'User not found'})
    }

    const cartItems = await Cart.find({userId: findUser._id})
    if (!cartItems) {
        return res.status(404).json({message: 'Cart items not found'})
    }

    let totalPrice = 0
    for (const cartItem of cartItems) {
        const product = await Product.findById(cartItem.productId)
        if (product) {
            totalPrice += parseFloat(product.price) * cartItem.quantity
        }
    }

    res.status(200).json({
        count: cartItems.length,
        cartItems: cartItems,
        totalPrice: totalPrice.toFixed(2),
    })
})
