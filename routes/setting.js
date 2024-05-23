const express = require('express');
const controller = require('../controllers/setting');
// const diagnosticProcedures = require('../controllers/settings/diagnosticprocedures');
// const vitalController = require('../controllers/settings/vital');
// const AuthGuard = require('../middleware/auth');
const router = express.Router();

router.get('/gethedisyear', controller.gethedisyear);

module.exports = router;