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

// Report Measure Report Definition / Cut-Point Router
router.get('/GetCutPointList', controller.GetCutPointList);
router.post('/AddCutPointItem', controller.AddCutPointItem);
router.post('/DelCutPointItem', controller.DelCutPointItem);
router.post('/UpdateCutPointItem', controller.UpdateCutPointItem);
// 
router.get('/GetOverallQualityScoreList', controller.GetOverallQualityScoreList);
router.post('/AddOverallQualityScoreItem', controller.AddOverallQualityScoreItem);
router.post('/DelOverallQualityScoreItem', controller.DelOverallQualityScoreItem);
router.post('/UpdateOverallQualityScoreItem', controller.UpdateOverallQualityScoreItem);
//
router.get('/GetQuarterlyMeasureList', controller.GetQuarterlyMeasureList);
router.post('/AddQuarterlyMeasureItem', controller.AddQuarterlyMeasureItem);
router.post('/DelQuarterlyMeasureItem', controller.DelQuarterlyMeasureItem);
router.post('/UpdateQuarterlyMeasureItem', controller.UpdateQuarterlyMeasureItem);
//
router.get('/GetSpecificIncentiveTypeList', controller.GetSpecificIncentiveTypeList);
router.post('/AddSpecificIncentiveTypeItem', controller.AddSpecificIncentiveTypeItem);
router.post('/DelSpecificIncentiveTypeItem', controller.DelSpecificIncentiveTypeItem);
router.post('/UpdateSpecificIncentiveTypeItem', controller.UpdateSpecificIncentiveTypeItem);
//

router.post('/GetProgramOQSList', controller.GetProgramOQSList);
router.post('/DelProgramOQSItem', controller.DelProgramOQSItem);
router.post('/GetOverallQualityScoreItme', controller.GetOverallQualityScoreItme);
router.post('/AddProgramOQSItem', controller.AddProgramOQSItem);

router.post('/setDefaultIns', controller.setDefaultIns);
router.post('/getDefaultIns', controller.getDefaultIns);

module.exports = router;
