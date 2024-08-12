
const express = require('express');
const controller = require('../controllers/tracking');
const router = express.Router();
const AuthGuard = require('../middleware/auth');

router.get('/patient/all', AuthGuard, controller.getAllPatientTracking);
router.post('/patient/byptid', AuthGuard, controller.getPtInsTrackByPtId);

router.get('/ffs/all', AuthGuard, controller.getAllFFSTracking);
router.post('/ffs/byptid', AuthGuard, controller.getFFSTrackByPtId);
router.post('/ffs/export', AuthGuard, controller.ffsExport);

module.exports = router;
