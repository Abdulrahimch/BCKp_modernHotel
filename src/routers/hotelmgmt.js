const express = require('express');
const router = express.Router();
const ImagesDB = require('../models/imagesdb');
const auth = require('../middleware/auth');
const angularAuth = require('../middleware/angularAuth');
const cookies = require('../middleware/cookies');
const RoomService = require('../models/roomservice');
const HouseKeeping = require('../models/housekeeping');
const BellBoy = require('../models/bellboy');
const { clearCache } = require('../utils/cache');

// this API is expected to be hitted once every 1 minute at most.
router.get('/get/orders', angularAuth, auth, async(req, res) => {
    let orders = [];
    const housekeeping = await HouseKeeping.findOne({ hotelName: req.user.hotelName });
    const roomservice = await RoomService.findOne({ hotelName: req.user.hotelName });
    const bellboy = await BellBoy.findOne({ hotelName: req.user.hotelName });
//    if (!housekeeping){ housekeeping.orders = [] }
//    if (roomservice){ roomservice.orders = [] }
    orders = { housekeepingOrders: housekeeping.orders, roomserviceOrders: roomservice.orders, bellboyOrders: bellboy.orders }
    res.send(orders);
});

// setting
// Body sent by Front-end shld look like follow:
// items: ['iron', 'cleaning'....]
router.post('/av/hk/services', angularAuth, auth, async(req, res) => {
    const housekeeping = await HouseKeeping.findOne({ hotelName: req.user.hotelName });
    req.body._id = req.user._id;
    housekeeping.items = req.body;

    try{
        await housekeeping.save();
        res.send();
    } catch(e){
        res.send(e);
    }
    clearCache({ hotelName: req.user.hotelName, collection: "housekeepings" });
});

// Very Important Note:
// the body shld be structured in the front-end as follow:
// {"items":
// [{"item": "pide", "price":30}, {"item": "ekmek", "price":2}, {"item": "Tavuk doner", "price":7},
//  {"item": "balik", "price":40}, {"item": "Kebab", "price":20}, {"item": "Urfa", "price":18},
//  {"item": "kanat", "price":23}, {"item": "Kola", "price":5}, {"item": "Su", "price":2},
//  {"item": "Ayran", "price":3}]
// }
router.post('/av/rm/services', angularAuth, auth, async(req, res) => {
    const roomservice = await RoomService.findOne({ hotelName: req.user.hotelName });
    roomservice.items = req.body;
    try{
        await roomservice.save();
        res.send(roomservice.items);

    } catch(e){
        res.send(e);
    }
    clearCache({ hotelName: req.user.hotelName, collection: "roomservices" });
});

//ToDo adding path method for bellboy.
// Note: bellboy items shld be ture or false.
router.post('/av/bb', angularAuth, auth, async(req, res) => {
    const bellboy = await BellBoy.findOne({ hotelName: req.user.hotelName }).cache();
    bellboy.items = req.body.items;
    try{
        await bellboy.save();
        res.send(bellboy.items);
    } catch(e){
        res.send(e);
    }
    clearCache({ hotelName: req.user.hotelName, collection: "bellboys" });
});

module.exports = router;