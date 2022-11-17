import express from 'express'
import { register, login, update, getAllUsers, deleteUser } from '../controllers/authController.js'
import authenticateUser from '../middleware/auth.js'

const router = express.Router()

router.route('/').get(authenticateUser,getAllUsers)
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/:email').delete(authenticateUser,deleteUser).patch(authenticateUser,update)

export default router