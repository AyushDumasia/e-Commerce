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
    // console.log(req.files)
    const {productName, category, description, price} = req.body
    const userId = req.user.id
    const coverImageLocalPath = await req.file.path
    // const imageLocalPath = req.files?.imageUrls[0]?.path
    console.log(coverImageLocalPath)
    if (!coverImageLocalPath) {
        throw new ApiError(406, 'images required') //Not Acceptable
    }
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    // const imageUrls = await uploadOnCloudinary(imageLocalPath)

    if (!coverImage) {
        throw new ApiError(406, ' images required')
    }
    console.log('Req Files : ' + req.file)
    const newProduct = new TempProduct({
        productName,
        category,
        description,
        price,
        coverImage: coverImage.url,
        // imageUrls: imageUrls?.url || '',
        userId,
    })
    await newProduct.save()
    res.status(200).json(new ApiResponse(200, newProduct))
})

//Add cart
export const addCart = asyncHandler(async (req, res) => {
    const user = req?.user
    const productId = req.params?.id
    const quantity = req.body?.quantity || 1

    const currUser = await User.findOne({email: user.email})
    if (!currUser) {
        return res.status(404).json({message: 'User not found'})
    }

    let cartItem

    const existingCartItem = await Cart.findOne({productId, userId: user.id})
    if (existingCartItem) {
        existingCartItem.quantity += quantity
        await existingCartItem.save()
        cartItem = existingCartItem
    } else {
        cartItem = await Cart.create({
            productId,
            userId: user.id,
            quantity,
        })
        currUser.cart.push(cartItem)
        await currUser.save()
    }

    res.status(200).json(
        new ApiResponse(200, cartItem, 'Cart updated successfully'),
    )
})

//Remover Cart
export const RemoveCart = asyncHandler(async (req, res) => {
    const user = req?.user
    const productId = req.params.id

    if (!user) {
        throw new ApiError(404, 'User not found')
    }

    if (!productId) {
        throw new ApiError(404, 'Product not found')
    }

    const product = await Cart.findOne({productId: productId})

    if (product.quantity <= 0) {
        throw new ApiError(400, 'Quantity must be greater than zero')
    }
    product.quantity--
    await product.save()
    if (product.quantity === 0) {
        console.log('PRODUCT : ', product)
        await product.deleteOne()
        return res
            .status(200)
            .json(
                new ApiResponse(200, 'Product removed successfully from Cart'),
            )
    }
    return res
        .status(200)
        .json(new ApiResponse(200, 'Product removed successfully'))
})

export const getCart = asyncHandler(async (req, res) => {
    const user = req.user
    const findUser = await User.findOne({_id: user.id})
    if (!findUser) {
        return res.status(404).json({message: 'User not found'})
    }

    const cartItems = await Cart.find({userId: findUser._id}).populate(
        'productId',
    )
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

//for Temp products
export const fetchTempProducts = asyncHandler(async (req, res) => {
    const products = await TempProduct.find()
    res.status(200).json(
        new ApiResponse(200, products, 'Product fetched successfully'),
    )
})
