import express from 'express'
import { register, login, update, getAllUsers } from '../controllers/authController.js'

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/updateUser').patch(update)
router.route('/').get(getAllUsers)

export default router