const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')

const hotelSchema = new mongoose.Schema({
    hotelId: {
        type: Number,
        unique: true
    },
    ownerUsername: String,
    hotelName: {
        type: String,
        unique: true
    },
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

hotelSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    const sortedHotels = await Hotels.find({}).sort({ hotelId: 1 });
    if (sortedHotels.length > 0){
        const largestIdHotel = sortedHotels[sortedHotels.length -1];
        const newHotelId = largestIdHotel.hotelId + 1;
        user.hotelId = newHotelId;
    }else{
        console.log('else is applied')
        user.hotelId = 1000001
    }

    next();
});

const Hotels = mongoose.model('Hotels', hotelSchema);
module.exports = Hotels;