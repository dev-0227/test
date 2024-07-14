const express = require('express');
const controller = require('../controllers/settings/reportbuilderController');
const router = express.Router();

// Report Builder Router 
router.get('/getInsuranceList', controller.getInsuranceList);
router.post('/getInsuranceTypeList', controller.getInsuranceTypeList);
router.post('/getInsuranceLOBList', controller.getInsuranceLOBList);
router.post('/getQualityProgramList', controller.getQualityProgramList);
router.post('/addQualityProgram', controller.addQualityProgram);
router.post('/delQualityProgram', controller.delQualityProgram);
router.post('/updateQualityProgram', controller.updateQualityProgram);
router.post('/getSelectLOBList', controller.getSelectLOBList);
router.post('/setDefaultIns', controller.setDefaultIns);
router.post('/getDefaultIns', controller.getDefaultIns);

module.exports = router;
