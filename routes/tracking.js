
const express = require('express');
const controller = require('../controllers/tracking');
const router = express.Router();
const AuthGuard = require('../middleware/auth');

router.get('/patient/all', AuthGuard, controller.getAllPatientTracking);

module.exports = router;
