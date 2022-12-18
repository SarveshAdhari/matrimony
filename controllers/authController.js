import User from "../models/User.js"
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'
import path from 'path'
import { request } from "express"

const register = async (req, res, next) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        throw new BadRequestError('Please enter all values!')
    }

    const userAlreadyExists = await User.findOne({ email })
    if (userAlreadyExists) {
        throw new BadRequestError('Email already in use!')
    }

    const user = await User.create({ name, email, password })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({
        user: {
            email: user.email,
            name: user.name,
            location: user.location,
            occupation: user.occupation,
            dob: user.dob,
            income: user.income,
            contact: user.contact,
            gender: user.gender,
        }, token
    })
}

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('Please Provide All Values')
    }
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        throw new UnAuthenticatedError('No such user exists!')
    }

    console.log(user)

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnAuthenticatedError('Invalid Credentials!')
    }
    user.password = undefined
    const token = user.createJWT()

    res.status(StatusCodes.OK).json({ user, token })
}

const update = async (req, res) => {
    const { email, name, occupation, location, dob, income, contact, gender, dp, fileName } = req.body
    console.log(req.body)
    if (!email || !name || !occupation || !location || !dob || !income || !contact || !gender ) {
        throw new BadRequestError('Please provide all values')
    }
    if (occupation === 'Not Mentioned' || location === 'Not Mentioned' || income === 'Not Mentioned' || contact === 'Not Mentioned' || gender === 'Not Mentioned') {
        throw new BadRequestError('Please provide all values')
    }

    const user = await User.findOne({ _id: req.user.userId })
    // console.log('user is',user)
    user.dp = fileName
    console.log(user.dp)
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
    res.status(StatusCodes.OK).json({ user, token })
}

const getAllUsers = async (req, res) => {
    const calculate_dob = (age) => {
        let today = new Date()
        let date = today.getDate()
        let month = today.getMonth()
        if (date < 10) date = "0" + date
        if (month < 10) month = "0" + month
        let calcDob = (today.getFullYear() - age) + "-" + month + "-" + date + "T00:00:00Z"
        console.log(calcDob)
        return calcDob
    }

    try {
        const { gender, age, location } = req.query
        const queryObject = {}

        if (gender && gender != "all") {
            queryObject.gender = gender
        }
        if (age && age != "all") {
            queryObject.age = calculate_dob(age)
            console.log(queryObject.age)
        }
        if (location && location != "anywhere") {
            queryObject.location = { $regex: location, $options: 'i' }
        }
        var result = User.find(queryObject)
        if (queryObject.age != "all") {
            var result = User.find({
                ...queryObject,
                dob: {
                    "$lt": `${queryObject.age}`
                },
            })
        }

        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 9
        const skip = (page - 1) * limit
        result = result.skip(skip).limit(limit)

        const users = await result

        let totalUsers = await User.countDocuments(queryObject)
        if (queryObject.age != "all") {
            totalUsers = await User.countDocuments({
                ...queryObject,
                dob: {
                    "$lt": `${queryObject.age}`
                },
            })
        }
        const pages = Math.ceil(totalUsers / limit)

        res.status(StatusCodes.OK).json({ users, totalUsers, pages })
    } catch (error) {
        throw new UnAuthenticatedError('Not aunthenticated to access this resource...')
    }
}

const deleteUser = async (req, res) => {
    const { email: email } = req.params
    const user = await User.findOne({ email: email })
    console.log(user)
    if (!user) {
        throw new UnAuthenticatedError('Not aunthenticated to access this resource...')
    }
    await user.remove()
    res.status(StatusCodes.OK).json({ msg: "user removed" })
}

export { register, login, update, getAllUsers, deleteUser }