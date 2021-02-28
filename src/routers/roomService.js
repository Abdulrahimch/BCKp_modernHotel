const express = require('express');
const router = new express.Router();
const ImagesDB = require('../models/imagesdb')
const auth = require('../middleware/auth')
const angularAuth = require('../middleware/angularAuth')
const cookies = require('../middleware/cookies')
const RoomService = require('../models/roomservice')
const BellBoy = require('../models/bellboy')

// API for the guest to register their order.
// {"item": "su", "numberOfItems": 1, "price": 2}
//router.patch('/order/meals', cookies, auth, async(req, res) => {
//    const roomService = await RoomService.findOne({ hotelName: req.user.hotelName });
//    req.body._id = req.user._id;
//    roomService.orders = roomService.orders.concat( req.body );
//    try{
//        await roomService.save();
//        res.send();
//    } catch(e) {
//
//        res.send(e);
//    }
//});

// Creating a roomService doc for a hotel
router.post('/create/roomservice', angularAuth, auth, async(req, res) => {
    const rs = new RoomService(req.body);
    rs.hotelName = req.user.hotelName;
    try{
        await rs.save();
        res.status(201).send(rs);
    } catch(e){
        res.send(e);
    }
});

router.post('/create/bellboy', angularAuth, auth, async(req, res) => {
    const bb = new BellBoy(req.body);
    bb.hotelName = req.user.hotelName;
    try{
        await bb.save();
        res.status(201).send(bb);
    } catch(e){
        res.send(e);
    }
});

// Very Important Note:
// the body shld be structured in the front-end as follow:
// {"items":
// [{"item": "pide", "price":30}, {"item": "ekmek", "price":2}, {"item": "Tavuk doner", "price":7},
//  {"item": "balik", "price":40}, {"item": "Kebab", "price":20}, {"item": "Urfa", "price":18},
//  {"item": "kanat", "price":23}, {"item": "Kola", "price":5}, {"item": "Su", "price":2},
//  {"item": "Ayran", "price":3}]
// }

//router.patch('/available/meals', angularAuth, auth, async(req, res) => {
//    const roomService = await RoomService.findOne({ hotelName: req.user.hotelName });
//    roomService.items = req.body.items;
//    try{
//        await roomService.save();
//        res.send(roomService.items);
//
//    } catch(e){
//        res.send(e);
//    }
//});

module.exports = router;