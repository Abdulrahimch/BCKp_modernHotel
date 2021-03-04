const mongoose = require('mongoose');

const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

const bellboySchema = new Schema({
    hotelName: {
        type: String,
        unique: true,
        trim: true
    },
    hotelId: Number,
    items:[
        {
            _id: false,
            item: { type: Boolean, default: true },
            imgUrl: String
        }
    ],
    orders: [
        {
            _id: ObjectId,
            roomNumber: {
                type: String
            },
            status: {
                type: String,
                default: 'pending'
            }
        }
    ]
});

const BellBoy = mongoose.model('BellBoy', bellboySchema);
module.exports = BellBoy;