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
const Tours = require('../models/tours');

// hk item shld be already created.
router.patch('/order/hk', cookies ,auth, async(req, res) => {
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

// API for guests to register their order.
// {"item": "su", "numberOfItems": 1, "price": 2}
router.patch('/order/rm', cookies, auth, async(req, res) => {
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

router.patch('/order/tour', cookies, auth, async(req, res) => {
    const tours = await Tours.findOne({ hotelName: req.user.hotelName });
    req.body.guest = req.user.name;
    req.body.roomNumber = req.user.roomNumber;
    tours.orders = tours.orders.concat(req.body);

    try{
        await tours.save()
        res.send(tours);
    }catch(e){
        res.send(e);
    }

})

router.get('/hk/services',  cookies, auth, async(req, res) => {
    const housekeeping = await houseKeeping.findOne({ hotelName: req.user.hotelName }).cache();
    res.send({ items: housekeeping.items })
});

router.get('/rm/services', cookies, auth, async(req, res) => {
    const roomservice = await RoomService.findOne({ hotelName: req.user.hotelName }).cache();
    res.send({ items: roomservice.items })
});

router.get('/bb/services', cookies, auth, async(req, res) => {
    const bellboy = await BellBoy.findOne({ hotelName: req.user.hotelName }).cache();
    res.send({ items: bellboy.items });
});

router.get('/tours', cookies, auth, async(req, res) => {
    const tours = await Tours.findOne({ hotelName: req.user.hotelName })
    res.send({ items: tours.items })
})

module.exports = router