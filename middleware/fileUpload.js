
import multer from 'multer'

//Multer
const storage = multer.diskStorage({
    destination:'./client/uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
const upload = multer({ storage: storage }).single('dp')
export {upload}