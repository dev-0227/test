const express = require('express');
const controller = require('../controllers/audit_event');
const router = express.Router();



router.post('/logger', controller.logger);


module.exports = router;