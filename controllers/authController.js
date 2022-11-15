import User from "../models/User.js"
import {StatusCodes} from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'
import { request } from "express"

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
        location: user.location,
        occupation: user.occupation,
        dob: user.dob,
        income: user.income,
        contact: user.contact,
        gender: user.gender,       
    }, token })
}

const login = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        throw new BadRequestError('Please Provide All Values')
    }
    const user = await User.findOne({email}).select('+password')
    if(!user){
        throw new UnAuthenticatedError('No such user exists!')
    }

    console.log(user)

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnAuthenticatedError('Invalid Credentials!')
    }
    user.password = undefined
    const token = user.createJWT()

    res.status(StatusCodes.OK).json({user, token})
}

const update = async (req, res) => {
    console.log(req.params.email)
    const { email, name, occupation, location, dob, income, contact, gender } = req.body
    if(!email || !name || !occupation || !location || !dob || !income || !contact || !gender){
        throw new BadRequestError('Please provide all values')
    }
    if(occupation === 'Not Mentioned' || location === 'Not Mentioned' || income === 'Not Mentioned' || contact === 'Not Mentioned' || gender === 'Not Mentioned'){
        throw new BadRequestError('Please provide all values')
    }

    const user = await User.findOne(req.params)
    console.log(user.name)
    user.email = email
    user.name = name
    user.occupation = occupation
    user.location = location
    user.dob = dob.toString()
    user.income = income
    user.contact = contact
    user.gender = gender

    await user.save()

    const token = await user.createJWT()
    res.status(StatusCodes.OK).json({user,token})
}

const getAllUsers = (req, res) => {
    res.send('Get All Users')
}

const deleteUser = async (req, res) => {
    const {email: email} = req.params
    const user = await User.findOne({email: email})
    console.log(user)
    if(!user){
        throw new UnAuthenticatedError('Not aunthenticated to access this resource...')
    }
    await user.remove()
    res.status(StatusCodes.OK).json({msg:"user removed"})
}

export { register, login, update, getAllUsers, deleteUser }