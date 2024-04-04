import TempProduct from '../models/pendingProduct.schema.js'
import Product from './../models/product.schema.js'
import {asyncHandler} from './../utils/asyncHandler.js'

export const showPendingProduct = async (req, res) => {
    const product = await TempProduct.findOne()

    res.status(200).json(product)
}

export const validProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id
    const tempProduct = await TempProduct.findById(productId)
    const approvedProduct = new Product({
        productName: tempProduct.productName,
        category: tempProduct.category,
        description: tempProduct.description,
        coverImage: tempProduct.coverImage,
        price: tempProduct.price,
        userId: tempProduct.userId,
    })
    await approvedProduct.save()
    await tempProduct.deleteOne()
    res.status(200).json(approvedProduct)
})

export const notApprovedProduct = asyncHandler(async (req, rse) => {
    const productId = req.params.id
    const tempProduct = await TempProduct.findByIdAndDelete(productId)
    res.status(200).json(tempProduct)
})
