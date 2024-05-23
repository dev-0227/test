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
router.post('/getlob', controller.getlob);
router.post('/addlob', controller.addlob);
router.post('/updatelob', controller.updatelob);
router.post('/chosenlob', controller.chosenlob);
router.post('/deletelob', controller.deletelob);

module.exports = router;