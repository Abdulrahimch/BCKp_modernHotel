const express = require('express');
const router = new express.Router();
const houseKeeping = require('../models/housekeeping');
const ImagesDB = require('../models/imagesdb');
const auth = require('../middleware/auth');
const angularAuth = require('../middleware/angularAuth');
const cookies = require('../middleware/cookies');
const multer = require('multer');
const RoomService = require('../models/roomservice');
const BellBoy = require('../models/bellboy');

// hk item shld be already created.
router.patch('/order/housekeeping', cookies ,auth, async(req, res) => {
    // remem front-end shld send the requested item in the body { item: xxx }
    const housekeeping = await HouseKeeping.findOne({ hotelName: req.user.hotelName });
    req.body._id = req.user._id;
    req.body.roomNumber = req.user.roomNumber;
    housekeeping.orders = housekeeping.orders.concat(req.body);

    try{
        await housekeeping.save();
        res.send();
    } catch(e){
        res.send(e);
    }
});

// API for the guest to register their order.
// {"item": "su", "numberOfItems": 1, "price": 2}
router.patch('/order/meals', cookies, auth, async(req, res) => {
    const roomService = await RoomService.findOne({ hotelName: req.user.hotelName });
    req.body._id = req.user._id;
    req.body.roomNumber = req.user.roomNumber;
    roomService.orders = roomService.orders.concat(req.body);
    try{
        await roomService.save();
        res.send();
    } catch(e) {

        res.send(e);
    }
});

router.patch('/order/bellboy', cookies, auth, async(req, res) => {
    const bellboy = await BellBoy.findOne({ hotelName: req.user.hotelName });
    req.body._id = req.user._id;
    req.body.roomNumber = req.user.roomNumber;
    bellboy.orders = bellboy.orders.concat(req.body);
    console.log('bellboy.orders', bellboy.orders)
    try{
        console.log('bellboy is: ', bellboy)
        await bellboy.save();
        res.send(bellboy);
    } catch(e) {

        res.send(e);
    }
});


//Notes:
// With get we set headers like this:
// res.set('content-Type': 'img/png')

// with post we call sharp and convert the type from whatever it is to png as follow:
// const buffer = await sharp(req.file.buffer).resize({width: 250, height:250}).png().toBuffer()





// order sent by the guest
// Front-end shld send the body as follow:
// {"item": "pide", "numberOfItems": 5, "price": 50}




module.exports = router