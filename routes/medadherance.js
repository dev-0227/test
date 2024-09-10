const express = require('express');

const controller = require('../controllers/settings/medadherance');

const router = express.Router();

// Medications Status Router 
router.get('/getMedStatus', controller.getMedStatus);
router.post('/getMedStatusById', controller.getMedStatusById);
router.post('/addMedStatus', controller.addMedStatus);
router.post('/updateMedStatusById', controller.updateMedStatusById);
router.post('/delMedStatus', controller.delMedStatus);
// Medications Form Router 
router.get('/getMedForm', controller.getMedForm);
router.post('/getMedFormById', controller.getMedFormById);
router.post('/addMedForm', controller.addMedForm);
router.post('/updateMedFormById', controller.updateMedFormById);
router.post('/delMedForm', controller.delMedForm);
// Medications Codes Router 
router.get('/getMedCodes', controller.getMedCodes);
router.post('/getMedCodesById', controller.getMedCodesById);
router.post('/addMedCodes', controller.addMedCodes);
router.post('/updateMedCodesById', controller.updateMedCodesById);
router.post('/delMedCodes', controller.delMedCodes);
// Medications Dispense Status Router
router.get('/getMedDispStatus', controller.getMedDispStatus);
router.post('/getMedDispStatusById', controller.getMedDispStatusById);
router.post('/addMedDispStatus', controller.addMedDispStatus);
router.post('/updateMedDispStatusById', controller.updateMedDispStatusById);
router.post('/delMedDispStatus', controller.delMedDispStatus);
// Medications Dispense Performer Router
router.get('/getMedDispPerformer', controller.getMedDispPerformer);
router.post('/getMedDispPerformerById', controller.getMedDispPerformerById);
router.post('/addMedDispPerformer', controller.addMedDispPerformer);
router.post('/updateMedDispPerformerById', controller.updateMedDispPerformerById);
router.post('/delMedDispPerformer', controller.delMedDispPerformer);
// Medications Request Status
router.get('/getMedReqStatus', controller.getMedReqStatus);
router.post('/getMedReqStatusById', controller.getMedReqStatusById);
router.post('/addMedReqStatus', controller.addMedReqStatus);
router.post('/updateMedReqStatusById', controller.updateMedReqStatusById);
router.post('/delMedReqStatus', controller.delMedReqStatus);
// Medications Request Priority
router.get('/getMedReqPriority', controller.getMedReqPriority);
router.post('/getMedReqPriorityById', controller.getMedReqPriorityById);
router.post('/addMedReqPriority', controller.addMedReqPriority);
router.post('/updateMedReqPriorityById', controller.updateMedReqPriorityById);
router.post('/delMedReqPriority', controller.delMedReqPriority);
// Medications Request Intent
router.get('/getMedReqIntent', controller.getMedReqIntent);
router.post('/getMedReqIntentById', controller.getMedReqIntentById);
router.post('/addMedReqIntent', controller.addMedReqIntent);
router.post('/updateMedReqIntentById', controller.updateMedReqIntentById);
router.post('/delMedReqIntent', controller.delMedReqIntent);
// Medications Request Course Therapy
router.get('/getMedReqCourse', controller.getMedReqCourse);
router.post('/getMedReqCourseById', controller.getMedReqCourseById);
router.post('/addMedReqCourse', controller.addMedReqCourse);
router.post('/updateMedReqCourseById', controller.updateMedReqCourseById);
router.post('/delMedReqCourse', controller.delMedReqCourse);

module.exports = router;