const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const angularAuth = require('../middleware/angularAuth')
const auth = require('../middleware/auth')

router.post('/staff', angularAuth, auth, async (req, res) => {
    const user = new User(req.body)
    user.hotelId = req.user.hotelId;
    user.hotelName = req.user.hotelName;


    try{
        await user.save()
        console.log('Saved properly')
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e)  {
        res.status(400).send(e)
    }

})

router.patch(`/staff`, angularAuth, auth, async(req, res) => {

      const updates = Object.keys(req.body)
//    const allowedUpdates = [ 'name' ,'email', 'designation', 'department']
//    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
//
//    if (!isValidOperation){
//        return res.status(404).send({ error : 'Invalid Update' })
//    }

    const staff = await User.findOne({email: req.body.email})

    if (!staff){
        return res.status(404).send({error: `staff not found`})
    }

    try{
        updates.forEach((update) => staff[update] = req.body[update])
        await staff.save()
        res.send(staff)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete(`/staff/:email`, angularAuth, auth, async(req, res) => {
    const staff = await User.findOne({email: req.params.email})

    if (!staff){
        return res.status(404).send({error: 'staff not found'})
    }
    try{
        await staff.remove()
        res.send(staff)
    }catch(e){
        res.status(500).send()
    }
})


router.get(`/staff`, angularAuth, auth, async(req, res) =>{
    let allMembers = []
    let staffObj = {}
    console.log(`Get staff has been trigered`)
    console.log(req.user.hotelName)
    const allStaff = await User.find({ hotelName: req.user.hotelName })
    let id = 0;
        for (staff of allStaff){
            if (staff.account === 'staff'){
                id++
                staffObj.id = id
                staffObj.email = staff.email
                staffObj.name = staff.name
                staffObj.designation = staff.designation
                staffObj.department = staff.department
                staffObj.address = staff.address
                staffObj.mobile = staff.mobile
                staffObj.joiningDate = staff.joiningDate
                allMembers.push(staffObj)
                staffObj = {}
            }
        }
        res.status(200).json(allMembers)
})

module.exports = router