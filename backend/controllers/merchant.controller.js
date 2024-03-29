import {v4 as uuidv4} from 'uuid'
import Merchant from '../models/merchant.schema.js'

export const becomeMerchant = async (req, res) => {
    const user = req.user
    if (user) {
        const alreadyUser = await Merchant.find({merchant: user.id})
        if (alreadyUser) {
            res.status(201).json({message: 'You are already a Merchant'})
        }
        const licenseId = uuidv4().toString()
        const newMerchant = new Merchant({merchant: user.id, licenseId})
        await newMerchant.save()
        res.status(200).json(newMerchant)
    } else {
        res.status(404).json({message: 'User not found , Please login '})
    }
}
