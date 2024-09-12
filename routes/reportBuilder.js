const express = require('express');
const controller = require('../controllers/settings/reportbuilder');
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

//
router.get('/GetMeasureNameList', controller.GetMeasureNameList);
router.get('/GetClinicNameList', controller.GetClinicNameList);
router.get('/GetReportNameList', controller.GetReportNameList);
router.get('/GetCutpointNameList', controller.GetCutpointNameList);
router.post('/AddSpecificCutpointMeasureItem', controller.AddSpecificCutpointMeasureItem);
router.get('/GetSpecificCutpointMeasureList', controller.GetSpecificCutpointMeasureList);
router.post('/DelSpecificCutpointMeasureItem', controller.DelSpecificCutpointMeasureItem);
router.post('/GetSpecificCutpointMeasureById', controller.GetSpecificCutpointMeasureById);
router.post('/UpdateSpecificCutpointMeasureItem', controller.UpdateSpecificCutpointMeasureItem);
router.post('/GetMeasureQualityId', controller.GetMeasureQualityId);



router.post('/setDefaultIns', controller.setDefaultIns);
router.post('/getDefaultIns', controller.getDefaultIns);



/** Measure Report Definition / Specific Measure Cutpoint */
router.get('/specificMeasureCutpoint', controller.GetSpecificMeasureCutpoint);
router.post('/specificMeasureCutpoint', controller.InsertSpecificMeasureCutpoint);
router.delete('/specificMeasureCutpoint', controller.DelSpecificMeasureCutpoint);
router.post('/specificMeasureCutpoint/:id', controller.GetSpecificCutpointMeasureById);
// router.put('/specificMeasureCutpoint/:id', controller.UpdateSpecificCutpointMeasureItem);
router.put('/specificMeasureCutpoint/:id', controller.UpdateSpecificMeasureCutpoint);

router.get('/clinics', controller.GetClinicNameList);
router.post('/reports', controller.GetReportNameList);
// router.post('/measureProgramCutpoint', controller.InsertMeasureProgramCutpoint);
// router.put('/measureProgramCutpoint/:id', controller.UpdateMeasureProgramCutpointItem);
// router.delete('/measureProgramCutpoint/:id', controller.DelMeasureProgramCutpointItem);
// router.post('/measureProgramCutpoint/:id', controller.GetMeasureProgramCutpointById);



/* Measure Report Definition / Measure Attribution */
router.get('/GetMeasureAttrList', controller.GetMeasureAttrList);
router.post('/NewMeasureAttrItem', controller.NewMeasureAttrItem);
router.post('/DeleteMeasureAttrItem', controller.DeleteMeasureAttrItem);
router.post('/UpdateMeasureAttrItem', controller.UpdateMeasureAttrItem);

/** Measure Report Definition / Measure Program Cutpoint */
router.get('/measureProgramCutpoint', controller.GetMeasureProgramCutpoints);
router.post('/measureProgramCutpoint', controller.InsertMeasureProgramCutpoint);
router.put('/measureProgramCutpoint/:id', controller.UpdateMeasureProgramCutpointItem);
router.delete('/measureProgramCutpoint/:id', controller.DelMeasureProgramCutpointItem);
router.post('/measureProgramCutpoint/:id', controller.GetMeasureProgramCutpointById);

// Report Builder 


// router.get('/GetHedisReportList', controller.GetHedisReportList);
router.get('/hedisQualityProgram', controller.GetHedisReportList);
router.post('/hedisQualityProgram', controller.InsertHedisReportItem);
router.delete('/hedisQualityProgram/:id', controller.DelHedisReportItem);
router.put('/hedisQualityProgram/:id', controller.UpdateHedisReportItem);

router.post('/UpdateHedisReportItem', controller.UpdateHedisReportItem);

router.post('/hedisMeasure', controller.GetHedisMeasureListByReportId);

// router.post('/GetHedisMeasureListByReportId', controller.GetHedisMeasureListByReportId);
router.post('/CheckSpecificCutpointMeasure', controller.CheckSpecificCutpointMeasure);
router.post('/CheckMeasureProgramCutpoint', controller.CheckMeasureProgramCutpoint);


// router.post('/DelHedisReportItem', controller.DelHedisReportItem);
router.post('/hedisMeasureItem', controller.InsertHedisMeasureItem);

router.post('/InsertHedisMeasureItem', controller.InsertHedisMeasureItem);
router.post('/GetHedisMeasureItemById', controller.GetHedisMeasureItemById);
router.post('/DelHedisMeasureItem', controller.DelHedisMeasureItem);

router.put('/hedisMeasureItem/:id', controller.UpdateHedisMeasureItem);
router.get('/GetIncentiveType', controller.GetIncentiveType);
router.get('/measureCategories', controller.GetMeasureCategories);
router.get('/measureAttr', controller.GetMeasureAttr);

router.post('/CheckMeasureForSelect', controller.CheckMeasureForSelect);
router.post('/CheckMeasureCutpoint', controller.CheckMeasureCutpoint);
router.post('/GetReportMeasure', controller.GetReportMeasure);
router.post('/GetInsuranceNameForReport', controller.GetInsuranceNameForReport);

// HEDIS Quality Tracker
router.get('/qualityPrograms', controller.qualityPrograms);
router.post('/qualityProgramMeasures', controller.qualityProgramMeasures);
router.post('/qualityProgramTracker/:id', controller.qualityProgramTracker);

router.get('/GetHedisQualityTrackerList', controller.GetHedisQualityTrackerList);
router.post('/clinicName', controller.clinicName);
router.post('/insertTracker', controller.insertTracker);

router.post('/cutpoint', controller.getCutpoints);

module.exports = router;
