const mongoose = require('mongoose')
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

const HouseKeepingSchema = Schema({
    hotelName: {
        type: String
    },
    item: {
        type: String
    },
//    img: {
//        type:
//    },
    orders: [{
        _id: ObjectId,
        status: 'w',
        roomNumber: Number
    }]
})