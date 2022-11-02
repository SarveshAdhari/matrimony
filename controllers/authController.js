import User from "../models/User.js"
import {StatusCodes} from 'http-status-codes'

const register = async (req, res, next) => {
    const user = await User.create(req.body)
    res.status(StatusCodes.CREATED).json({ user })
}

const login = (req, res) => {
    res.send('Login User')
}

const update = (req, res) => {
    res.send('Update User')
}

const getAllUsers = (req, res) => {
    res.send('Get All Users')
}

const deleteUser = (req, res) => {
    res.send('Delete User')
}

export { register, login, update, getAllUsers, deleteUser }