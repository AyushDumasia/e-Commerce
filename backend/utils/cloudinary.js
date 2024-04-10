import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import sharp from 'sharp'
import {asyncHandler} from './asyncHandler.js'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

// const transFormImage = asyncHandler(async (localFilePath) => {
//     const newImage = await sharp(localFilePath).toFormat('jpeg' , {quality : })
// })

// export const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) return null
//         let res = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: 'image',
//         })
//         console.log('Upload Successfully : ', res)
//         return res
//     } catch (err) {
//         return null
//     } finally {
//         fs.unlinkSync(localFilePath)
//     }
// }
// const uploadProcessedToCloudinary = async (processedBuffer) => {
//     try {
//         const uploadResult = await cloudinary.uploader.upload(processedBuffer, {
//             resource_type: 'image',
//         })
//         console.log('Upload Successfully 1 : ', uploadResult)
//         // .end(processedBuffer)
//         return uploadResult
//     } catch (error) {
//         console.error('Error uploading to Cloudinary:', error)
//         throw error
//     }
// }

// export const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) return null

//         const processedBuffer = await sharp(localFilePath)
//             .toFormat('jpeg', {quality: 70})
//             .toBuffer()

//         const uploadResult = await uploadProcessedToCloudinary(processedBuffer)

//         console.log('Upload Successfully : ', uploadResult)

//         return uploadResult
//     } catch (err) {
//         console.error('Error uploading to Cloudinary:', err)
//         return null
//     } finally {
//         fs.unlinkSync(localFilePath)
//     }
// }

// export const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) return null

//         const transformation = {
//             quality: 'auto:low',
//         }

//         let res = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: 'image',
//             transformation: transformation,
//         })

//         console.log('Upload Successfully : ', res)
//         return res
//     } catch (err) {
//         console.error('Error uploading image: ', err)
//         return null
//     } finally {
//         fs.unlinkSync(localFilePath)
//     }
// }

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        let res = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'image',
        })
        console.log('Upload Successfully : ', res)
        return res
    } catch (err) {
        return null
    } finally {
        fs.unlinkSync(localFilePath)
    }
}
