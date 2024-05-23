const express = require('express');
//const tokenMid = require('../middlewares/tokens');
const controller = require('../controllers/invoice');

const router = express.Router();

// Get all logs route 
router.post('/getdata', controller.getdata);

module.exports = router;