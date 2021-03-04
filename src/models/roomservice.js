const mongoose = require('mongoose');
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

const roomServiceSchema = new Schema({
    hotelName: {
        type: String,
        unique: true
    },
    hotelId: Number,
    items:[
        {
            _id: false,
            item: String,
            price: Number,
            imgUrl: String
        }
    ],
    orders:[
        {
            _id: {
                type: ObjectId
            },
            item: {
                type: String
            },
            roomNumber: {
                type: String
            },
            status: {
                type: String,
                default: 'pending'
            },
            numberOfItems: {
                type: Number
            },
            price: {
                type: Number
            }
        }
    ]

});


const RoomService = mongoose.model('RoomService', roomServiceSchema);
module.exports = RoomService;