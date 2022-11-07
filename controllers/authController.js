import User from "../models/User.js"
import {StatusCodes} from 'http-status-codes'
import { BadRequestError } from '../errors/index.js'

const register = async (req, res, next) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        throw new BadRequestError('Please enter all values!')
    }

    const userAlreadyExists = await User.findOne({email})
    if(userAlreadyExists){
        throw new BadRequestError('Email already in use!')
    }

    const user = await User.create({name, email, password})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user:{
        email: user.email,
        name: user.name,       
    }, token })
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