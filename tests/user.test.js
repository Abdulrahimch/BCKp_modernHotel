const request = require('supertest')
const app = require('../src/index')
const jwt = require('jsonwebtoken')
const User = require('../src/models/user')
const mongoose = require('mongoose')

const userOneId = new mongoose.Types.ObjectId()
const hotelManagerOneId = new mongoose.Types.ObjectId()
// this user is supposed to be a hotel manager
const hotelManagerOne = {
    _id: hotelManagerOneId,
    name: 'abdulrahim',
    email: 'abdulrahim@abood.com',
    password: 'fedo12345',
    hotelName: 'Dilhayat Kalfa Hotel',
    account: 'hotelManager',
    tokens: [{
        token: jwt.sign({ _id: hotelManagerOneId }, process.env.JWT_SECRET)
    }]

}

const userOne = {
    _id: userOneId,
    name: 'Audrey',
    email: 'Audrey@abood.com',
    password: 'fedo12345',
    hotelName: 'Dilhayat Kalfa Hotel',
    account: 'guest',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]

}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
    await new User(hotelManagerOne).save()
})

test('test sign up successfull', async() => {
    await request(app).post('/users').send({
        name: "test",
        email: "test@abood.com",
        password: "fedo12345",
        account: "hotelManager"
    }).expect(201)
})

test('test login hotel manager successful', async() => {
    await request(app).post('/login').send({
        email: hotelManagerOne.email,
        password: hotelManagerOne.password
    }).expect(200)
})

test('test login guest successful', async() => {
    const res = await request(app).post('/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

})

test('test login failure', async() => {
    await request(app).post('/login').send({
        email: 'wrong@abood.com',
        password: 'fedo12345'
    }).expect(400)
})

test('test add booking successful', async() => {
    await request(app)
    .post('/booking')
    .set('Authorization', `Bearer ${hotelManagerOne.tokens[0].token}`)
    .send({
        email: 'audrety@abood.com',
        name: 'audrey',
        arriveDate: Date(11-12-2020),
        departDate: Date(15-12-2020),
        roomNumber: 55
    }).expect(201)
})

test('test get all bookings', async() => {
    await request(app)
    .get('/booking')
    .set('Authorization', `Bearer ${hotelManagerOne.tokens[0].token}`)
    .send({}).expect(200)
})

test('Update a booking', async() => {
    const res = await request(app)
    .patch('/booking')
    .set('Authorization', `Bearer ${hotelManagerOne.tokens[0].token}`)
    .send({
        email: 'Audrey@abood.com',
        roomNumber: 100
    }).expect(200)

    const user = await User.findById(res.body._id)
    expect(user.roomNumber).toBe(100)
    expect(user.name).not.toBeNull()
})

