import express from 'express'
import { register, login, update, getAllUsers, deleteUser } from '../controllers/authController.js'
import authenticateUser from '../middleware/auth.js'
// import { upload } from '../middleware/fileUpload.js'

// import multer from 'multer'
//Image Related
// const multerStorage = multer.diskStorage({
//     destination:(req, file ,cb)=>{
//         cb(null, 'uploads')
//     },
//     filename:(req, file, cb)=>{
//         cb(null, file.originalname)
//     }
// })
// const upload = multer({storage: multerStorage})

const router = express.Router()

router.route('/').get(authenticateUser,getAllUsers)
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/:email').delete(deleteUser)
router.route('/updateUser').patch(authenticateUser,update)

export default router