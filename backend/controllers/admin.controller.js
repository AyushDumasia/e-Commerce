import TempProduct from '../models/pendingProduct.schema.js'
import Product from './../models/product.schema.js'
import {asyncHandler} from './../utils/asyncHandler.js'
import User from './../models/user.schema.js'
import {getMail} from '../utils/nodemailer.js'
import DailyUser from '../models/dailyActive.schema.js'

// * Show a pending products for a Approval
export const showPendingProduct = asyncHandler(async (req, res) => {
    const product = await TempProduct.findOne()
    res.status(200).json(product)
})

// * Approve a pending product
export const validProduct = asyncHandler(async (req, res) => {
    const userId = req.user?.id
    const productId = req.params.id
    const tempProduct = await TempProduct.findById(productId)
    const approvedProduct = new Product({
        productName: tempProduct.productName,
        category: tempProduct.category,
        description: tempProduct.description,
        coverImage: tempProduct.coverImage,
        // imageUrls: tempProduct.imageUrls,
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

// * Not Approve a pending product
export const notApprovedProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id
    const tempProduct = await TempProduct.findByIdAndDelete(productId)
    res.status(200).json(tempProduct)
})

// export const fetchProduct = asyncHandler(async (req, rse) => {})

// * Fetch a Daily Active User
export const dailyUser = asyncHandler(async (req, res) => {
    const counts = await DailyUser.find()

    let countArr = {
        countVal: [],
        label: [],
    }

    for (const count of counts) {
        countArr.countVal.push(count.count)
        countArr.label.push(count.date)
    }

    console.log(countArr)

    res.status(200).json(countArr)
})

export const totalCategory = asyncHandler(async (req, res) => {
    try {
        const categoryCounts = await Product.aggregate([
            {$group: {_id: '$category', count: {$sum: 1}}},
        ])

        res.json(categoryCounts)
    } catch (error) {
        console.error('Error retrieving category product counts:', error)
        res.status(500).json({error: 'Internal Server Error'})
    }
})

//TODO : Create a pie Chart for a category
