const mqtt = require('mqtt');
const renderOrder = require('../utils/renderOrder') //my module
const express = require('express')
const router = new express.Router()
const cookies = require('../middleware/cookies')
const auth = require('../middleware/auth')

//router.use(express.json())

let hkBody = '';
let rmBody = '';
let bbBody = '';
let id = 1;

const houseKeepingTopic = 'hotel/hotel_mgmt/housekeeping';
const roomServiceTopic = 'hotel/hotel_mgmt/roomservice';
const bellboyTopic = 'hotel/hotel_mgmt/bellboy'
const client  = mqtt.connect('mqtt://127.0.0.1');

client.on('connect', () => {
  client.subscribe(houseKeepingTopic);
  client.subscribe(roomServiceTopic);


});
//text = []
client.on('message', (topic, message) => {
  // message is Buffer
  id++

  if (topic === houseKeepingTopic){
    hkBody += renderOrder(message.toString(), id);
    console.log(message.toString())
  }
  else if (topic === roomServiceTopic){
    rmBody += renderOrder(message.toString(), id);
    console.log(message.toString());
  }
  else if (topic === bellboyTopic){
    bbBody += renderOrder(message.toString(), id);
    console.log(id)
  }

  //client.end()
});

router.get(`/housekeeping`, cookies, auth, async(req, res) => {
    if(req.user.team === 'house keeping'){
        res.render(`orderlist`, {markup:hkBody})
    } else{
        res.send('wrong Credentials')
    }
})

router.get(`/roomservice`, cookies, auth, async(req, res) => {

    if(req.user.team === 'room service'){
        res.render(`orderlist`, {markup: rmBody})
    } else{
        res.send('wrong Credentials')
    }
})

router.get(`/bellboy`, cookies, auth, async(req, res) => {

    if(req.user.team === 'bell boy'){
        res.render(`orderlist`, {markup: bbBody})
    } else{
        res.send('wrong Credentials')
    }
})

//


//const server = http.createServer((req, res) => {
//
//    const uri = url.parse(req.url, true);
//    const pathName = url.parse(req.url, true).pathname;
//    const query = url.parse(req.url, true).href;
//
//
//
//    if (pathName === '/home'){
//        console.log(uri);
//        res.writeHeader(200, { 'content-type' : 'text/html' });
//        fs.readFile(`${__dirname}/home.html`, 'utf-8', (err, data) => {
//            res.end(data);
//
//    });
//    }
//    else if (pathName === '/housekeeping'){
//        res.writeHeader(200, { 'content-type' : 'text/html' });
//        fs.readFile(`${__dirname}/templates/template.html`, 'utf-8', (err, data) => {
//            let output = data.replace(/{%MARKUP%}/g, hkBody);
//            res.end(output);
//
//    });
//    }
//    else if (pathName === '/roomservice'){
//        res.writeHeader(200, { 'content-type' : 'text/html' });
//        fs.readFile(`${__dirname}/templates/template.html`, 'utf-8', (err, data) => {
//            let output = data.replace(/{%MARKUP%}/g, rmBody);
//            res.end(output);
//    });
//    }
//    else if (pathName === '/bellboy'){
//        res.writeHeader(200, { 'content-type' : 'text/html' });
//        fs.readFile(`${__dirname}/templates/template.html`, 'utf-8', (err, data) => {
//            let output = data.replace(/{%MARKUP%}/g, bbBody);
//            res.end(output);
//
//    });
//    }
//
//
//});
//// ToDo add the ip address of the host right after the port name as follow
//// server.listen(1337. '192.168.1.1', ()=> {})
//
//server.listen(1337, () => {
//    console.log('Listening for requests now!');
//});
//
module.exports = router