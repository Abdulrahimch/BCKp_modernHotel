const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')
const bodyParser = require('body-parser')
const renderRequest = require('../utils/renderRequest')
const optionHandler = require('../utils/optionHandler')
const sendRequest = require('../utils/sendRequest')
const cookies = require('../middleware/cookies')
const header = require('../middleware/cors')
const angularAuth = require('../middleware/angularAuth')


router.use(express.json())


router.get(`/users/me`, angularAuth, auth ,async (req, res) => {
    console.log(user.arriveDate)
    console.log(typeof(user.arriveDate))
    user.arriveDate >= user.departDate
    res.send(req.user)


})

router.get(`/users/:id`, async (req, res) => {
    const _id = req.params.id
    const date = new Date()
    try{

        const user = await User.findById(_id)
        console.log(user.arriveDate)
        console.log(typeof(user.arriveDate))
        console.log('lets test')

        timeZone = TimeZone.getTimeZone("Europ/Turkey")
        console.log(timeZone)

        if (!user)
            return res.status(404).send()

        res.status(200).send(user)
    } catch (e) {
        res.status(500).send()
    }

})

router.patch(`/users/me`, auth ,async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'is_staff', 'is_active']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation){
        return res.status(404).send({ error : 'Invalid Update' })
    }


    try{
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete(`/users/me`,  auth, async (req, res) => {
//    const _id = req.params.id
//    try {
//        const user = await User.findByIdAndDelete(_id)
//
//        if (!user){
//            return res.status(404).send({error : 'Id does not exist'})
//        }
    try{
        await req.user.remove()
        res.send(req.user)
    } catch(e) {
        res.status(500).send()
    }
})



// Create a User
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    console.log(req.body)

    // Encrypt the password only if the account belongs to hotelManager
    if (user.account === 'hotelManager'){
        user.password = await bcrypt.hash(req.body.password, 8)
    }

    try{
        await user.save()
        console.log('Saved properly')
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e)  {
        res.status(400).send(e)
    }

})

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post(`/login`, urlencodedParser ,async(req, res) => {
    try{
        //ToDO Entering req.body.hotelName after adding search bar to Login page.
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).json({token:token})

    } catch(e) {
        console.log(e)
        res.status(400).send(e)
    }

})

router.post(`/login/guest`, urlencodedParser, async(req, res) => {
   try{
        const user = await User.findGuestsByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.cookie(`jwt`, token)
        res.render(`openDoor`)

   } catch(e){
        res.status(400).send(e)
   }
})

router.post(`/users/logout`, auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) =>  token.token !== req.token)
        await req.user.save()
        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

router.post(`/users/logoutall`, auth, async(req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.status(200).send()
    } catch(e){
        res.status(500).send(e)
    }
})

// function rundering the requester to the approperiate page.
//ToDo add auth
router.post(`/send/req`, cookies, auth, urlencodedParser, async(req, res) => {
    //Toadd req.url, req.data
    //Think of the Auth process btw Node.js and Django
    //console.log(req.cookies)
    //console.log(req.user.room_number)
    // ToDo adding req.body.url
    let options = optionHandler(req.body.number_of_items, req.body.url, req.user.room_number)
    sendRequest(options).then((response) => {
        res.status(201).send(response)
    }).catch((error) =>{
        res.status(400).json({ msg : 'Done successfully' })
    })
})





module.exports = router

