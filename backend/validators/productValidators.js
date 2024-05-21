import {z} from 'zod'

const validProduct = z.object({
    productName: z.string().nonempty(),
    category: z.string().nonempty({message: 'Category is required'}),
    description: z.string().nonempty({message: 'Description is required'}),
    images: z
        .array(
            z.object({
                fieldname: z.string(),
                originalname: z.string(),
                encoding: z.string(),
                mimetype: z.string(),
                destination: z.string(),
                filename: z.string(),
                path: z.string(),
                size: z.number(),
            }),
        )
        .min(1, {message: 'At least one image is required'}),
    stock: z.string().min(0, {message: 'Stock must be a non-negative integer'}),
    price: z.string(),
    userId: z.string(),
})

export default validProduct
