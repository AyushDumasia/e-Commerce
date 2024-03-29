import Merchant from '../models/merchant.schema.js'

export const validateMerchant = async (req, res, next) => {
    try {
        const merchant = req.user
        const validateUser = await Merchant.find().populate('merchant')
        console.log(validateUser)
        if (!validateUser) {
            return res.status(404).json({message: 'Merchant not found'})
        }
        next()
    } catch (err) {
        console.error(err)
        return res.status(500).json({message: 'Internal Server Error'})
    }
}
