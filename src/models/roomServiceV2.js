const mongoose = require('mongoose')
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

const roomServiceSchemaV2 = new Schema({
    hotelName: String,
    items: String,
    price: Number,
    orders:[
        {
            _id:{
                type: ObjectId
            },
            roomNumber{
                type: Number
            },
            status{
                type: String,
                default: 'pending'
            },
            numberOfItems{
                type: Number
            }
        }

    ]


});

const RoomServiceV2 = mongoose.model('RoomSErviceV2', roomServiceSchemaV2);
module.exports = RoomServiceV2;