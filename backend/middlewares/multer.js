import multer from 'multer'

export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, file.originalname)
    },
})

// export const imageUploader = (req, res, next) => {
//     upload.fields([
//         {name: 'coverImage', maxCount: 1},
//         {name: 'imageUrls', maxCount: 6},
//     ])(req, res, function (err) {
//         if (err instanceof multer.MulterError) {
//             return res.status(400).json({message: 'Error uploading images'})
//         } else if (err) {
//             return res.status(400).json({message: err.message})
//         }
//         next()
//     })
// }

export const upload = multer({storage: storage})
