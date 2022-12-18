
import multer from 'multer'
// import path from 'path'

//Multer
const storage = multer.diskStorage({
    destination:'./client/public/uploads',
    filename: (req, file, cb) => {
        // console.log(file)
        cb(null,file.originalname)
    }
})
const upload = multer({ storage: storage }).single("dp")
export {upload}