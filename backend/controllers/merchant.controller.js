import {v4 as uuidv4} from 'uuid'
import Merchant from '../models/merchant.schema.js'
import {ApiResponse} from './../utils/ApiResponse.js'
import {ApiError} from './../utils/ApiError.js'
import {asyncHandler} from './../utils/asyncHandler.js'
import {uploadOnCloudinary} from './../utils/cloudinary.js'

export const becomeMerchant = async (req, res) => {
    try {
        const user = req.user
        if (!user) {
            throw new ApiError(404, 'User not found, please login')
        }
        const localDocument = await req.file.path

        const document = await uploadOnCloudinary(localDocument)

        const alreadyUser = await Merchant.findOne({merchant: user.id})
        console.log(alreadyUser)
        if (alreadyUser) {
            return res.status(400).json({message: 'You are already a Merchant'})
        }

        const licenseId = uuidv4().toString()
        const newMerchant = new Merchant({
            merchant: user.id,
            document: document.url,
            licenseId,
        })
        await newMerchant.save()

        return res
            .status(200)
            .json(new ApiResponse(200, newMerchant, 'Now, you are a Merchant'))
    } catch (error) {
        console.error('Error becoming merchant:', error)
        return res
            .status(error.statusCode || 500)
            .json({message: error.message || 'Internal Server Error'})
    }
}

export const currentMerchant = asyncHandler(async (req, res) => {
    const user = req.user.id
    console.log(user)
    const merchant = await Merchant.findOne({merchant: user})
    console.log('Merchant : ', merchant)
    res.status(200).json(merchant)
})
