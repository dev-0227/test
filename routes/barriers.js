const express = require('express');
// const controller = require('../controllers/settings/medadherance');
// const controller = require('../controllers/settings/medications');

const controller = require('../controllers/barriers');
const AuthGuard = require('../middleware/auth');
const router = express.Router();

// PT Risk Level Router 
router.get('/getPTRiskLevel', AuthGuard, controller.getPTRiskLevel);
router.post('/getPTRiskLevelById', AuthGuard, controller.getPTRiskLevelById);
router.post('/addPTRiskLevel', AuthGuard, controller.addPTRiskLevel);
router.post('/updatePTRiskLevelById', AuthGuard, controller.updatePTRiskLevelById);
router.post('/delPTRiskLevel', AuthGuard, controller.delPTRiskLevel);

// PT Communication Needs Router 
router.get('/getPTCommNeeds', AuthGuard, controller.getPTCommNeeds);
router.post('/getPTCommNeedsById', AuthGuard, controller.getPTCommNeedsById);
router.post('/addPTCommNeeds', AuthGuard, controller.addPTCommNeeds);
router.post('/updatePTCommNeedsById', AuthGuard, controller.updatePTCommNeedsById);
router.post('/delPTCommNeeds', AuthGuard, controller.delPTCommNeeds);

// ICD10 Router 
router.get('/getICD10', AuthGuard, controller.getICD10);
router.post('/getICD10ById', AuthGuard, controller.getICD10ById);
router.post('/addICD10', AuthGuard, controller.addICD10);
router.post('/updateICD10ById', AuthGuard, controller.updateICD10ById);
router.post('/delICD10', AuthGuard, controller.delICD10);

// Disability Category Router 
router.get('/getDisabilityCategory', AuthGuard, controller.getDisabilityCategory);
router.post('/getDisabilityCategoryById', AuthGuard, controller.getDisabilityCategoryById);
router.post('/addDisabilityCategory', AuthGuard, controller.addDisabilityCategory);
router.post('/updateDisabilityCategoryById', AuthGuard, controller.updateDisabilityCategoryById);
router.post('/delDisabilityCategory', AuthGuard, controller.delDisabilityCategory);

module.exports = router;