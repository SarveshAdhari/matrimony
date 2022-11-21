import mongoose from "mongoose"
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const date = new Date()
const pastDate = date.getDate() + "-" + date.getMonth() + "-" + (date.getFullYear() - 18)

const UserSchema = new mongoose.Schema({
    // dp: {
    //     image: { data: Buffer, contentType: String }
    // },
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        minlength: 3,
        maxlength: 40,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please enter a valid email',
        },
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: 6,
        select:false,
    },
    location: {
        type: String,
        trim: true,
        maxlength: 50,
        default: 'Not Mentioned',
    },
    occupation: {
        type: String,
        trim: true,
        maxlength: 50,
        default: 'Not Mentioned',
    },
    dob: {
        type: String,
        maxlength: 50,
        default: pastDate,
    },
    income: {
        type: String,
        trim: true,
        maxlength: 20,
        default: 'Not Mentioned',
    },
    contact: {
        type: String,
        trim: true,
        maxlength: 50,
        default: 'Not Mentioned',
    },
    gender: {
        type: String,
        trim: true,
        maxlength: 20,
        default: 'Not Mentioned',
    },
})

UserSchema.pre('save', async function () {
    if(!this.isModified('password')) return
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
    )
}

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

export default mongoose.model('Users', UserSchema)