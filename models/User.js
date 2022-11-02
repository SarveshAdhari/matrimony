import mongoose from "mongoose"
import validator from 'validator'
import moment from 'moment'

const date = new Date()
const pastDate = date.getDate()+"-"+date.getMonth()+"-"+(date.getFullYear()-18)

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter a name.'],
        minlength: 3,
        maxlength: 40,
        trim: true,
    },
    email:{
        type: String,
        required: [true, 'Please enter an email.'],
        validate:{
            validator: validator.isEmail,
            message: 'Please enter a valid email.',
        },
        unique: true,
    },
    password:{
        type: String,
        required: [true, 'Please enter a password.'],
        minlength: 6,
    },
    location:{
        type: String,
        trim: true,
        maxlength: 50,
        default: 'Not Mentioned.',
    },
    occupation:{
        type: String,
        trim: true,
        maxlength: 50,
        default: 'Not Mentioned.',
    },
    dob:{
        type: String,
        maxlength: 50,
        default: pastDate,
    },
    income:{
        type: String,
        trim: true,
        maxlength: 20,
        default: 'Not Mentioned.',
    },
    contact:{
        type: String,
        trim: true,
        maxlength: 50,
        default: 'Not Mentioned.',
    },
    gender:{
        type: String,
        trim: true,
        maxlength: 20,
        default: 'Not Mentioned.',
    },
})

export default mongoose.model('Users', UserSchema)