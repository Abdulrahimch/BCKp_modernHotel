const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const Room = require('../models/room')
const angularAuth = require('../middleware/angularAuth')
const auth= require('../middleware/auth')
const generator = require('generate-password');
sendEmail = require('../utils/sendEmail');
const keys = require('../keys')
const verifyRoomLocked = require('../verifications/verifyRoomLocked')

router.post('/booking', angularAuth, auth, async (req, res) => {
// resetting arrive and depart times
// Ckeck-in time is at 14:00
// Check-out time is at 12:00
    let arriveDateTurkey = new Date(req.body.arriveDate);
    let departDateTurkey = new Date(req.body.departDate);
    req.body.arriveDate = arriveDateTurkey.setTime(arriveDateTurkey.getTime() + (17*60*60*1000));
    req.body.departDate = departDateTurkey.setTime(departDateTurkey.getTime() + (15*60*60*1000));

    //Extracting %y%M%D from the whole date
//    roomFrom = arriveDateTurkey
//    roomTo = departDateTurkey

    from = JSON.stringify(arriveDateTurkey).slice(1, 11);
    to = JSON.stringify(departDateTurkey).slice(1, 11);

    req.body.roomStatus = 'oc';

    let password = generator.generate({
    length: 10,
    numbers: true
});

    const user = new User(req.body);
    user.userId = (user.name + JSON.stringify(user._id).slice(-4)).slice(0, -1);
    user.hotelId = req.user.hotelId;
    user.hotelName = req.user.hotelName;
    user.password = password;



    //room exists, concat roomStatus to it.
    let room = await Room.findOne({ hotelName: user.hotelName, roomNumber: req.body.roomNumber });
    try{
        for (let status of room.roomStatus) {
            if (from >= status.from && from < status.to){
                console.log('room is full in this date, please choose another date');
                throw new Error('room is full in this date, please choose another date');
            }
        }
        room.roomStatus = room.roomStatus
                          .concat({ _id: user._id, from: from, to: to, status: 'oc', name: user.name, price: user.price });
    } catch(e){
        res.status(400).send({error: 'this Date is already taken'});
    }

    try{
        await room.save();
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

router.patch('/booking', angularAuth, auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name' ,'email', 'arriveDate', 'departDate', 'roomNumber']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation){
        return res.status(404).send({ error : 'Invalid Update' })
    }
    //TODO adding departDate and ArriveDate to User.findOne

    //let booking = await User.findOne({ email: req.body.email, hotelName: req.user.hotelName, arriveDate: req.body.arriveDate })
    let booking = await User.findOne({ _id: req.body._id })

    if (!booking){
        return res.status(404).send({ error: `booking not found` })
    }
    // adding hotelName to booking
    booking.hotelName = req.user.hotelName

    if (req.body.arriveDate){
        var arriveDateTurkey = new Date(req.body.arriveDate)
        req.body.arriveDate = arriveDateTurkey.setTime(arriveDateTurkey.getTime() + (17*60*60*1000))
    }

    if (req.body.departDate){
        var departDateTurkey = new Date(req.body.departDate)
        req.body.departDate = departDateTurkey.setTime(departDateTurkey.getTime() + (15*60*60*1000))
    }


    let room = await Room.findOne({ hotelName: booking.hotelName, roomNumber: booking.roomNumber })

    // converting dates into %y %M %D
    let from = JSON.stringify(arriveDateTurkey).slice(1, 11)
    let to = JSON.stringify(departDateTurkey).slice(1, 11)
    room.roomStatus.forEach((status) => {
        if(status._id.toString() == booking._id.toString()){
            status.from = from
            status.to = to
            index = room.roomStatus.indexOf(status)
            room.roomStatus.splice(index, 1, status)
        }
    })

    try{
        updates.forEach((update) => booking[update] = req.body[update])
        await booking.save()
        await room.save()
        res.send(booking)
    }catch(e){
        res.status(400).send(e)
    }
})

router.patch('/booking/lockstatus', angularAuth, auth, async(req, res) => {
    const booking = await User.findOne({ _id: req.body._id });
    if(!booking){
        return res.status(404).send({ error: `booking not found` });
    }
    booking.lockStatus = req.body.lockStatus;
    try{
        await booking.save();
        res.send(booking);
    } catch(e){
        res.status(400).send(e);
    }
});

router.delete('/booking/:_id', angularAuth, auth, async(req, res) => {
    const booking = await User.findById({ _id: req.params._id });
    if (!booking){
        return res.status(404).send({error: 'Booking not found'});
    }
    let room  = await Room.findOne({ hotelName: booking.hotelName, roomNumber: booking.roomNumber });
    room.roomStatus.forEach((status) => {
        if(status._id.toString() === req.params._id){
            index = room.roomStatus.indexOf(status);
            room.roomStatus.splice(index, 1);
            console.log('room.roomStatus', room.roomStatus);
        }
    });

    try{
        await booking.remove();
        await room.save();
        res.send(booking);
    }catch(e){
        res.status(500).send();
    }
});

// retrieve all bookings.
router.get('/booking', angularAuth, auth,async(req, res) => {
    let guests = [];
    let guestsObj = {};
    const allGuests = await User.find({ hotelName: req.user.hotelName });
    let id = 0;
        for (guest of allGuests){
            if (guest.account === 'guest'){
                  guestsObj = guest
                  id++
                  guestsObj.id = id
                  guests.push(guestsObj)
                  guestsObj = {}
            }
        }
        res.status(200).json(guests);
});

router.get('/todaysCheckIn', angularAuth, auth, async(req, res) => {
    allHotelBookings = await User.find({ hotelName: req.user.hotelName })
    todaysCheckIn = []
    let id = 0
    for (booking of allHotelBookings){
        let checkInDay = new Date(booking.arriveDate)
        let today = new Date()
        checkInFormatYMD = JSON.stringify(checkInDay).slice(1, 11);
        todayFormatYMD = JSON.stringify(today).slice(1, 11);

        if (checkInFormatYMD === todayFormatYMD){
            todaysCheckIn.push(booking)
            id++
         }

        }
        console.log(todaysCheckIn)
        res.status(200).json(todaysCheckIn)
})

router.get(`/bookingStatistics`, angularAuth, auth, async(req, res) => {
    let hotelName = req.user.hotelName
    let checkInCounter = 0
    let checkOutCounter = 0
    let today = new Date()
    let todayFormatYMD = JSON.stringify(today).slice(1, 11)

    allBookings = await User.find({ hotelName })
    for (booking of allBookings){
        let checkInDay = new Date(booking.arriveDate)
        let checkInFormatYMD = JSON.stringify(checkInDay).slice(1,11)
        let checkOutDay = new Date(booking.departDate)
        let checkOutFormatYMD = JSON.stringify(checkOutDay).slice(1, 11)

        if (checkInFormatYMD === todayFormatYMD){
            checkInCounter++
        }

        if (checkOutFormatYMD === todayFormatYMD){
             checkOutCounter++
        }

    }
    console.log(`todays check-in is: ${checkInCounter}`)
    console.log(`Todays check-out is: ${checkOutCounter}`)
    res.status(200).json([{checkInCounter},{checkOutCounter}])
//    2.Get Get todaysCheckIn.
//    3.Get Todays CheckOUt.
//    4.Get All Booking
})

//router.get(`/todaysCheckOut`, angularAuth, auth, async(req, res) => {
//    allHotelBookings = await User.find({hotelName: req.user.hotelName})
//    todaysCheckOut = []
//    let id = 0
//    for (booking of allHotelBookings){
//        let checkOutDat = new Date(booking.departDate)
//        let today = new Date()
//        checkOutFormatYMD = JSON.stringify(checkOutDat).slice(1, 11);
//        todayFormatYMD = JSON.stringify(today).slice(1, 11);
////
////        if (checkOutFormatYMD === todayFormatYMD){
////            todaysCheckOut.push(booking)
////            id++
////
////         } else{
////            console.log(`can not check-in `)
////
////        }
//        }
//       // allTodaysCheckIn.push({checkInCounter:id})
//        console.log(todaysCheckIn)
//
//        res.status(200).json(todaysCheckIn)
//
//})

//find all bookings that their departDate has passed.
//turn their lookStatus into 'lock'
//router.get('/checkout/unlock', async(req, res) => {
//    allB
//})

router.get(`/todaysCheckOut`, angularAuth, auth, async(req, res) => {
    allHotelBookings = await User.find({hotelName: req.user.hotelName})
    todaysCheckOut = []
    let id = 0
    for (booking of allHotelBookings){
        let checkOutDat = new Date(booking.departDate)

        let today = new Date()
        console.log('todays hour is ', today.getHours())
        checkOutFormatYMD = JSON.stringify(checkOutDat).slice(1, 11);
        todayFormatYMD = JSON.stringify(today).slice(1, 11);

        if (checkOutFormatYMD === todayFormatYMD){
            todaysCheckOut.push(booking)
            id++
         }

    for (booking of todaysCheckOut) {
        if (today.getHours() >= 10) {
            booking.lockStatus = 'lock'
            await booking.save()
            }
        }
        }
    res.status(200).send(todaysCheckOut)

    })


module.exports = router