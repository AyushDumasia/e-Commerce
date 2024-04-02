import TempProduct from '../models/pendingProduct.schema.js'
import Product from './../models/product.schema.js'

export const showPendingProduct = async (req, res) => {
    const product = await TempProduct.findOne()

    res.status(200).json(product)
}

export const validProduct = async (req, res) => {
    try {
        const productId = req.params.id
        console.log(productId)
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
    } catch (err) {
        console.log(err)
    }
}
