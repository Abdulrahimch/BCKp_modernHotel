const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')

const hotelSchema = new mongoose.Schema({
    hotelId: Number,
    ownerUsername: String,
    hotelName: String,
    roomRange: [],
    hotelAddress: {
        type: String,
        trim: true,
        default: ''
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Invalid email address')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 7,
        validate(value){
            if (value.includes('password')){
                throw new error('Password can not contain password')
            }
        }
    },
    account: {
        type: String,
        trim: true,
        default: 'hotelManager'
    }
});

hotelSchema.index({ hotelName: 1 }, { unique: true });

hotelSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const Hotels = mongoose.model('Hotels', hotelSchema);
module.exports = Hotels;