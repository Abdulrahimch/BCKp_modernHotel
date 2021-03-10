const mongoose = require('mongoose')
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

const HouseKeepingSchema = new Schema({
    hotelName: {
        type: String,
        unique: true
    },
    hotelId: Number,
    items: [
        {
            _id: false,
            item: String,
            imgUrl: String
        }
    ],
    orders: [{
        _id: ObjectId,
        item: String,
        status: {
            type: String,
            default: 'pending'
        },
        roomNumber: Number
    }]

});
//HouseKeepingSchema.index({ hotelName: 1 }, { unique: true });
const HouseKeeping = mongoose.model('HouseKeeping', HouseKeepingSchema)

module.exports = HouseKeeping