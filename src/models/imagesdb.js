const mongoose = require('mongoose')

const imagesDBSchema = new mongoose.Schema({
    item: {
        type: String
    },
    img: {
        type: Buffer
    }
})
imagesDBSchema.index({ item: 1, img: 1 }, { unique: true });
const ImagesDB = mongoose.model('ImagesDB', imagesDBSchema);
module.exports = ImagesDB;