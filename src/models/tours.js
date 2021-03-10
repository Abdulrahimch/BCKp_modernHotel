const mongoose = require('mongoose');
const { Schema } = mongoose;

const tourSchema = new Schema({
    hotelName: String,
    hotelId: Number,
    items: [
        {
            _id: { type: Schema.Types.ObjectId },
            title: String,
            content: String,
            price: Number,
            imgUrl: []
        }
    ],
    orders: [
        {
            _id: { type: Schema.Types.ObjectId },
            guest: String,
            title: String,
            price: Number,
            roomNumber: Number,
            tourDate: Date,
            numberOfPpl: Number
        }
    ]
});

const Tours = mongoose.model('Tours', tourSchema);
module.exports = Tours;