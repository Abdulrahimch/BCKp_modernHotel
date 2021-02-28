require('./db/mongoose');
const User = require('./models/user');
const http = require('http');
const express = require('express');
const path = require('path');
const userRouter = require('./routers/user');
const mqttSubRouter = require('./routers/mqttSub');
const bookingRouter = require('./routers/booking');
const staffRouter = require('./routers/staff');
const awsMqtt = require('./routers/awsMqtt');
const cookieParser = require('cookie-parser');
const mqttDoorPubRouter = require('./routers/mqttDoorPub');
const roomsRouter = require('./routers/rooms');
const guestOrdersRouter = require('./routers/guestOrders');
const roomServiceRouter = require('./routers/roomService');
const housekeepingRouter = require('./routers/housekeeping');
const hotelmgmtRouter = require('./routers/hotelmgmt');
const bellboyRouter = require('./routers/bellboy');
const hotelsRouter = require('./routers/hotels');


//ToDo this func apply some changes before sending query to MongoDB
require('./utils/cache');


app = express()
// Automatically parse incoming json to an object.
app.use(express.json())
app.use(cookieParser());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-requested-with, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, PATCH, DELETE, OPTIONS");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(userRouter);
app.use(mqttSubRouter);
app.use(bookingRouter);
app.use(staffRouter);
app.use(mqttDoorPubRouter);
app.use(awsMqtt);
app.use(roomsRouter);
app.use(guestOrdersRouter);
app.use(roomServiceRouter);
app.use(housekeepingRouter);
app.use(hotelmgmtRouter);
app.use(bellboyRouter);
app.use(hotelsRouter);

const pathViews = path.join(__dirname, '../templates/views')
const publicDirPath = path.join(__dirname, '../public/')
app.use(express.static(publicDirPath))

app.set('view engine', 'hbs')
app.set('views', pathViews)

app.get('/home', (req, res) => {
    res.render('home')
})

app.get('/home/restaurant', (req, res) => {
    res.render('restaurant')
})

app.get(`/test`, (req, res) => {
    res.render('test')
})

app.get(`/test2`, (req, res) => {
    res.render('test2')
})

module.exports = app