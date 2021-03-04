const express = require('express');
const router = express.Router();
const Hotels = require('../models/hotels');
const Room = require('../models/room');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const Housekeeping = require('../models/housekeeping');
const RoomService = require('../models/roomservice');
const Bellboy = require('../models/bellboy');

//Subscribing a new hotel.
router.post('/hotel', async(req, res) => {
    const hotel = new Hotels(req.body);

    // upon creating a hotel, all its rooms shld be created.
    //[[10,20],[50,60]]
    hotel.roomRange.map((range) => {
        range.map(async(room) => {
            if (room == range[1]){
                let newRoom = new Room({ "roomNumber": room });
                newRoom.hotelName = req.body.hotelName;
                await newRoom.save();
            }
            while(room < range[1]){
                console.log('room is: ', room)
                let newRoom = new Room({ "roomNumber": room });
                newRoom.hotelName = req.body.hotelName;
                await newRoom.save();
                room++
            }

        });
    });

    try{
        await hotel.save();

    } catch(e){
        res.send(e);
    }
    const user = new User(req.body);
    user.hotelId = hotel.hotelId;
    user.password = await bcrypt.hash(req.body.password, 8);

    const housekeeping = new Housekeeping({ hotelName: req.body.hotelName, hotelId: hotel.hotelId });
    const roomservice = new RoomService({ hotelName: req.body.hotelName, hotelId: hotel.hotelId });
    const bellboy = new Bellboy({ hotelName: req.body.hotelName, hotelId: hotel.hotelId });
    try{
        await user.save();
        await housekeeping.save();
        await roomservice.save();
        await bellboy.save();
        res.status(200).send();
    } catch(e){
        res.send(e);
    }
});

//Post the default housekeeping items to facilitate the process of choosing hk items on hotel managers.
router.post('/hk/default/items', async(req, res) => {
   // this request is USED for one time only.
   let housekeeping = await Housekeeping.findOne({ hotelName: 'all' });

   if (housekeeping) {
      throw new Error('Record already exists...');
        }
   housekeeping = new Housekeeping({ hotelName: 'all' , items: req.body});
   try{
      housekeeping.save();
      res.status(201).send(housekeeping);
   } catch(e){
      res.send(e);
   }

});

router.patch('/hk/default/items', async(req, res) => {
    const housekeeping = await Housekeeping.findOne({ hotelName: 'all' });
    if (!housekeeping){
        throw new Error('Please create the default housekeeping\'s items');
    }

    req.body.map(item => {
        housekeeping.items = housekeeping.items.concat(item);
    });
    try{
        housekeeping.save();
        res.send(housekeeping);
        } catch(e) {
            res.send(e);
        }
});

router.get('/hk/default/items', async(req, res) => {
    const housekeeping = await Housekeeping.findOne({ hotelName: 'all' });
    if (!housekeeping){
        throw new Error('Please create the default housekeeping\'s items');
    }
    res.status(200).send({ items: housekeeping.items });

});

// bellboy does not need patch query.
router.post('/bb/default/items', async(req, res) => {
   // this request is USED for one time only.
   let bellboy = await Bellboy.findOne({ hotelName: 'all' });

   if (!bellboy) {
      bellboy = new Bellboy({ hotelName: 'all'});
      }

   bellboy.items = req.body
   try{
      bellboy.save();
      res.status(201).send(bellboy);
   } catch(e){
      res.send(e);
   }

});

router.get('/bb/default/items', async(req, res) => {
    const bellboy = await Bellboy.findOne({ hotelName: 'all' });
    if (!bellboy){
        throw new Error('Please create the default bellboy\'s items');
    }
    res.status(200).send({ items: bellboy.items });

});

router.post('/rm/default/items', async(req, res) => {
   // this request is USED for one time only.
   let roomservice = await RoomService.findOne({ hotelName: 'all' });

   if (roomservice) {
      throw new Error('Record already exists...');
        }
   roomservice = new RoomService({ hotelName: 'all' , items: req.body});
   try{
      roomservice.save();
      res.status(201).send(roomservice);
   } catch(e){
      res.send(e);
   }

});

router.patch('/rm/default/items', async(req, res) => {
    const roomservice = await RoomService.findOne({ hotelName: 'all' });
    if (!roomservice){
        throw new Error('Please create the default roomservice\'s items');
    }

    req.body.map(item => {
        roomservice.items = roomservice.items.concat(item);
    });
    try{
        roomservice.save();
        res.send(roomservice);
        } catch(e) {
            res.send(e);
        }
});

router.get('/hk/default/items', async(req, res) => {
    const roomservice = await RoomService.findOne({ hotelName: 'all' });
    if (!roomservice){
        throw new Error('Please create the default housekeeping\'s items');
    }
    res.status(200).send({ items: roomservice.items });

});

module.exports = router