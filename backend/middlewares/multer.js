import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Data.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, file.originalname + '-' + file.filename)
    },
})

export const upload = multer({storage})
