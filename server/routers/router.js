const express = require('express');
const connection = require('../controllers/controller')
const router = express.Router();
const path = require('path')
const crypto = require('crypto')
const fs = require('fs');
const { put } = require('@vercel/blob')
const multer = require('multer')


const upload = multer({
    storage: multer.memoryStorage(), // Store the file in memory as a buffer
});


// ********* Get Requests *********

router.get('/', connection.connection)

router.get('/:id/fetchUsers', connection.getAllUsers)


router.get('/:id/fetchUserDetails', connection.getUserDetails)

router.get('/fetchMessages', connection.getMessages)

router.get('/fetchContacts/:id', connection.getContacts)

// ********* Post Requests *********
router.post('/login', connection.login)

router.post('/register', connection.register)

router.post('/sendMessage', connection.sendMessage)

router.post('/newNotification/:id/:tempRecieverId', connection.newNotification)

router.post('/changeNotification/:id/:reciever', connection.changeNotification)

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        // Check if the file exists
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }

        // Get file details from Multer
        const { buffer, originalname } = req.file;


        // Upload file to Vercel Blob
        const { url } = await put(originalname, buffer, { access: "public" });


        // Return the uploaded file's public URL
        res.status(200).json({ url });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Failed to upload the file." });
    }
});





module.exports = router;
