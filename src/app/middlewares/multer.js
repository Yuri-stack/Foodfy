const multer = require('multer')
const Public = require('../models/Public')

const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, './public/images') },

    filename: (req, file, cb) => { cb(null, `${Date.now().toString()}-${file.originalname}`) }
})

const fileFilter = (req, file, cb) => {
    const isAccpted = ['image/png', 'image/jpg', 'image/jpeg']
    .find(accptedFormat => accptedFormat == file.mimetype)

    if(isAccpted){
        return cb(null, true)
    }

    return cb(null, false)
}

module.exports = multer({storage,fileFilter})