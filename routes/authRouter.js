import express from 'express'
import { register, login, update, getAllUsers, deleteUser } from '../controllers/authController.js'

const router = express.Router()

router.route('/').get(getAllUsers)
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/:email').delete(deleteUser).patch(update)

export default router