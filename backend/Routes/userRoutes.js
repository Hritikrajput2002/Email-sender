const multer = require('multer');
const path = require('path');

// Multer setup (since we can't import from `server.js`)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ dest: 'uploads/' });



const express = require('express');
const router = express.Router();
const { sendMail } = require('../Controllers/userControllers');


router.route('/user/sendmail').post(upload.array('attachments', 5), sendMail);

module.exports = router;
