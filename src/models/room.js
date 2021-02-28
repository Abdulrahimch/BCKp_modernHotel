const mongoose = require('mongoose')

const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var roomSchema = new Schema({
    hotelName: {
        type: String,
        index: true
    },
    roomNumber: {
        type: Number,
        index: true
    },
    roomStatus:[
       {
       _id:{
            type: ObjectId,
       },
       name: String,
       price: Number,
        from:{
            type: String,
            trim: true

        },
        to: {
            type: String,
            trim: true,
        },
        status: {
            type: String
        }
       }
    ]
})

roomSchema.index({ hotelName: 1, roomNumber: 1 }, { unique: true });
const Room = mongoose.model('Rooms', roomSchema);

module.exports = Room