const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const Room = require('../models/room')
const angularAuth = require('../middleware/angularAuth')
const auth= require('../middleware/auth')

router.post(`/rooms`, angularAuth, auth, async(req, res) => {
    searchedArriveDate = new Date(req.body.searchedArriveDate)
    searchedDepartDate = new Date(req.body.searchedDepartDate)
    searchedArriveDateYMD = JSON.stringify(searchedArriveDate).slice(1, 11)
    searchedDepartDateYMD = JSON.stringify(searchedDepartDate).slice(1, 11)

    const allBooking = await User.find({hotelName: req.user.hotelName})

    allRooms = []
    for (booking of allBooking){
        if (booking.account === 'guest'){
            let bookingArriveDate = booking.arriveDate
            let bookingDepartDate = booking.departDate
            bookingArriveDateYMD = JSON.stringify(bookingArriveDate).slice(1, 11)
            bookingDepartDateYMD = JSON.stringify(bookingDepartDate).slice(1, 11)

              if (bookingArriveDateYMD >= searchedArriveDateYMD &&
                bookingArriveDateYMD < searchedDepartDateYMD &&
                 bookingDepartDateYMD <= searchedDepartDateYMD){
                console.log('match')
                allRooms.push(booking)
                }
        }
    }
    res.status(200).send(allRooms)

})

router.get(`/room`, angularAuth, auth, async(req, res) => {
    const rooms = await Room.find({ hotelName: req.user.hotelName })
    res.status(200).send(rooms)
})

router.post(`/room`, angularAuth, auth, async(req, res) => {
    room = new Room(req.body);
    room.hotelName = req.user.hotelName;
    try{
    await room.save();
    res.status(201).send(room);
    } catch(e){
        res.send(e);
    }
})

module.exports = router


