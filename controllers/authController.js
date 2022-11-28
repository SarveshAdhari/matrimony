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
    // console.log('user id is',req.user.userId)
    const { email, name, occupation, location, dob, income, contact, gender } = req.body
    if(!email || !name || !occupation || !location || !dob || !income || !contact || !gender){
        throw new BadRequestError('Please provide all values')
    }
    if(occupation === 'Not Mentioned' || location === 'Not Mentioned' || income === 'Not Mentioned' || contact === 'Not Mentioned' || gender === 'Not Mentioned'){
        throw new BadRequestError('Please provide all values')
    }

    const user = await User.findOne({_id: req.user.userId})
    // console.log('user is',user)
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

const getAllUsers = async (req, res) => {
    try {
        const {gender, age, location} = req.query
        const queryObject = {}

        if(gender != "all"){
            queryObject.gender = gender
        }
        if(age != "all"){
            queryObject.age = age
        }
        if(location != "anywhere"){
            queryObject.location = {$regex: location, $options: 'i'}
        }
        let result = User.find(queryObject)

        const users = await result
    res.status(StatusCodes.OK).json({users, totalUsers: users.length, pages: 1})
    } catch (error) {
        throw new UnAuthenticatedError('Not aunthenticated to access this resource...')
    }
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