import express from 'express'
import { register, login, update, getAllUsers, deleteUser } from '../controllers/authController.js'
import authenticateUser from '../middleware/auth.js'
import rateLimiter from 'express-rate-limit'

import { upload } from '../middleware/fileUpload.js'

// import multer from 'multer'
// Image Related
// import multer from 'multer'
// const storage = multer.diskStorage({
//     destination:'./client/uploads',
//     filename: (req, file, cb) => {
//         console.log(file)
//         cb(null, file.filename+"-"+Date.now())
//     }
// })
// const upload = multer({ storage: storage }).single('dp')

const router = express.Router()

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Too many requests. Please try again later.'
})

router.route('/').get(authenticateUser,getAllUsers)
router.route('/register').post(apiLimiter, register)
router.route('/login').post(apiLimiter, login)
router.route('/:email').delete(deleteUser)
router.route('/updateUser').patch(upload, authenticateUser, update)

export default router