import TempProduct from '../models/pendingProduct.schema.js'
import Product from './../models/product.schema.js'
import {asyncHandler} from './../utils/asyncHandler.js'
import User from './../models/user.schema.js'
import {getMail} from '../utils/nodemailer.js'

export const showPendingProduct = asyncHandler(async (req, res) => {
    const product = await TempProduct.findOne()
    res.status(200).json(product)
})

export const validProduct = asyncHandler(async (req, res) => {
    const userId = req.user?.id
    const productId = req.params.id
    const tempProduct = await TempProduct.findById(productId)
    const approvedProduct = new Product({
        productName: tempProduct.productName,
        category: tempProduct.category,
        description: tempProduct.description,
        coverImage: tempProduct.coverImage,
        stock: tempProduct.stock || 10,
        price: tempProduct.price,
        userId: tempProduct.userId,
    })
    const user = await User.find({_id: tempProduct.userId})
    await approvedProduct.save()
    await tempProduct.deleteOne()
    const info = await getMail(
        user.email,
        `Confirmation about product ${approvedProduct.productName}`,
        `We approved your product  ${approvedProduct.productName}`,
    )
    res.status(200).json(approvedProduct)
})

export const notApprovedProduct = asyncHandler(async (req, rse) => {
    const productId = req.params.id
    const tempProduct = await TempProduct.findByIdAndDelete(productId)
    res.status(200).json(tempProduct)
})

export const fetchProduct = asyncHandler(async (req, rse) => {})
