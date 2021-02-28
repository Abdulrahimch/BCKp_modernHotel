const express = require('express');
const router = new express.Router();
const HouseKeeping = require('../models/housekeeping')
const ImagesDB = require('../models/imagesdb')
const auth = require('../middleware/auth')
const angularAuth = require('../middleware/angularAuth')
const cookies = require('../middleware/cookies')
const multer = require('multer')

// Create a housekeeping doc for a hotel
router.post('/create/hk', angularAuth, auth, async(req, res) => {
    const housekeeping = new HouseKeeping(req.body)
    housekeeping.hotelName = req.user.hotelName

    try{
        await housekeeping.save();
        res.status(201).send()
    } catch(e){
        res.send(e)
    }
});

//ToDo creating setting items by the hotel for housekeeping (patch method) as we did with roomService.
// Body sent by Front-end shld look like follow:
// items: ['iron', 'cleaning'....]
//router.patch('/available/hk/stuff', angularAuth, auth, async(req, res) => {
//    const housekeeping = await HouseKeeping.findOne({ hotelName: req.user.hotelName });
//    req.body._id = req.user._id
//    housekeeping.items = req.body;
//
//    try{
//        await housekeeping.save();
//        res.send();
//    } catch(e){
//        res.send(e);
//    }
//});

// hk item shld be already created.
//router.patch('/order/housekeeping', cookies ,auth, async(req, res) => {
//    // remem front-end shld send the requested item in the body { item: xxx }
//    const housekeeping = await HouseKeeping.findOne({ hotelName: req.user.hotelName });
//    req.body._id = req.user._id;
//    req.body.roomNumber = req.user.roomNumber;
//    housekeeping.orders = housekeeping.orders.concat(req.body);
//
//    try{
//        await housekeeping.save();
//        res.send();
//    } catch(e){
//        res.send(e);
//    }
//});

module.exports = router