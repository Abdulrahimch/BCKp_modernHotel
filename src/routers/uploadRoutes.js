const express = require('express');
const router = new express.Router();
const uuid = require('uuid');
const AWS = require('aws-sdk');
const keys = require('/home/cisco/environment/s3User');
const angularAuth = require('../middleware/angularAuth');
const auth = require('../middleware/auth');

const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey
});

router.get('/api/upload', angularAuth, auth, async(req, res) => {
    //const key = `${ req.user.hotelName }/${ uuid.v1() }.jpg`
    const key = `${ uuid.v1() }.jpeg`
    console.log(key)
    s3.getSignedUrl('putObject', {
        Bucket: 'moder-hotel-imgs',
        ContentType: 'jpeg',
        Key: key
    }, (err, url) => res.send({ key, url }));
});

module.exports = router;
