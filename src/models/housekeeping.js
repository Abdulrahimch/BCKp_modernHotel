const mongoose = require('mongoose')
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

const HouseKeepingSchema = new Schema({
    hotelName: {
        type: String,
        unique: true
    },
    items: [],
//    img: {
//        type: Buffer
//    },
    orders: [{
        _id: ObjectId,
        item: String,
        status: {
            type: String,
            default: 'pending'
        },
        roomNumber: Number
    }]

})
//HouseKeepingSchema.index({ hotelName: 1 }, { unique: true });
const HouseKeeping = mongoose.model('HouseKeeping', HouseKeepingSchema)

module.exports = HouseKeeping