const mongoose = require('mongoose');

const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

const bellboySchema = new Schema({
    hotelName: {
        type: String,
        unique: true,
        trim: true
    },
    items: {
        type: Boolean,
        default: true
    },
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