const express = require('express');
const connection = require('../controllers/controller')
const router = express.Router();
const path = require('path')
const crypto = require('crypto')
const fs = require('fs');
const { put } = require('@vercel/blob')
const multer = require('multer')
const AWS = require('aws-sdk');


const s3 = new AWS.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: 'us-east-1' // Replace with your region
});

const upload = multer({
  storage: multer.memoryStorage(), // Store the file in memory as a buffer
});


// ********* Get Requests *********

router.get('/', connection.connection)

router.get('/:id/fetchUsers', connection.getAllUsers)

router.get('/:id/getCurrentUser', connection.getCurrentUser)


router.get('/:id/fetchUserDetails', connection.getUserDetails)

router.get('/fetchMessages', connection.getMessages)

router.get('/fetchContacts/:id', connection.getContacts)

router.get('/verify-token', connection.isLoggedIn)

// ********* Post Requests *********
router.post('/login', connection.login)

router.post('/register', connection.register)

router.post('/sendMessage', connection.sendMessage)

router.post('/likeUser/:id', connection.likeUser)

router.post('/favouriteUser/:id', connection.favouriteUser)

router.post('/newNotification/:id/:tempRecieverId', connection.newNotification)

router.post('/changeNotification/:id/:reciever', connection.changeNotification)

router.post('/upload', upload.single('file'), (req, res) => {
  const params = {
    Bucket: 'shadibucket',
    Key: `${Date.now()}-${req.file.originalname}`,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
    //   ACL: 'public-read',
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.log(err.message);

      return res.status(500).send(err);
    }
    res.status(200).send({ url: data.Location });
  });
});




module.exports = router;
