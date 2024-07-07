const express = require('express');
const controller = require('../controllers/insurance');

const router = express.Router();

// Get all logs route 
router.get('/', controller.list);
router.get('/getHedisList', controller.getHedisList);
router.post('/add', controller.add);
router.post('/update', controller.update);
router.post('/chosen', controller.chosen);
router.post('/delete', controller.delete);
// Insurance Lob route
router.get('/lob/list', controller.lobList);
router.post('/getlob', controller.getlob);
router.post('/gettypeItem', controller.gettypeItem);
router.post('/addlob', controller.addlob);
router.post('/updatelob', controller.updatelob);
router.post('/chosenlob', controller.chosenlob);
router.post('/deletelob', controller.deletelob);
router.post('/setDefaultIns', controller.setDefaultIns);
router.post('/getDefaultIns', controller.getDefaultIns);
// Insurance Type route
router.get('/gettype', controller.gettype);
router.post('/addtype', controller.addtype);
router.post('/deletetype', controller.deletetype);
router.post('/chosentype', controller.chosentype);
router.post('/updatetype', controller.updatetype);
// Payment Method route
router.get('/getPaymentMethod', controller.getPaymentMethod);
router.post('/addPaymentMethod', controller.addPaymentMethod);
router.post('/delPaymentMethod', controller.delPaymentMethod);
router.post('/getPaymentMethodById', controller.getPaymentMethodById);
router.post('/updatePaymentMethod', controller.updatePaymentMethod);

module.exports = router;
