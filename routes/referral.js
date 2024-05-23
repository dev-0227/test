const express = require('express');
const EncounterController = require('../controllers/hedis/encounter');
const AuthGuard = require('../middleware/auth');
const router = express.Router();

router.get('/appointmentSpecialty', AuthGuard, EncounterController.appointmentSpecialty);

module.exports = router;