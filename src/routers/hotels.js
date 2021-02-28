const express = require('express');
const router = express.Router();
const Hotels = require('../models/hotels');
const Room = require('../models/room');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const Housekeeping = require('../models/housekeeping');
const RoomService = require('../models/roomservice');
const Bellboy = require('../models/bellboy');

router.post('/hotel', async(req, res) => {
    const hotel = new Hotels(req.body);
    const user = new User(req.body);
    user.password = await bcrypt.hash(req.body.password, 8);

    const housekeeping = new Housekeeping({ hotelName: req.body.hotelName });
    const roomservice = new RoomService({ hotelName: req.body.hotelName });
    const bellboy = new Bellboy({ hotelName: req.body.hotelName });

    // upon creating a hotel, all its rooms shld be created.
    //[[10,20],[50,60]]
    hotel.roomRange.map((range) => {
        const start = Date.now()
        range.map( async(room) => {
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
        console.log('elapsed time is ', Date.now() - start);
    });

    try{
        await hotel.save();
        await user.save();
        await housekeeping.save();
        await roomservice.save();
        await bellboy.save();
        res.status(200).send();
    } catch(e){
        res.send(e);
    }
    // step number two, all its teams shld be created.
});
module.exports = router