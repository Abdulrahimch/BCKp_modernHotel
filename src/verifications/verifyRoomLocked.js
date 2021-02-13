const User = require('../models/user')

const verifyRoomLocked =  async (booking) => {
    // setting currentTime
    now = new Date()
    now.setTime(now.getTime() + (3*60*60*1000))
    rooms = await User.find({ hotelName: booking.hotelName, roomNumber: booking.roomNumber, roomStatus: 'oc' })
    console.log('rooms: are: ', rooms)
    console.log('now is: ', now)
    for (room of rooms ){
        if ( now >= room.arriveDate && now < room.departDate ){
            console.log(`the room is already occupied by ${ room.email }`)
            throw new Error( `the room is already occupied by ${ room.email }` )
        }
    }
    return true
}

module.exports = verifyRoomLocked