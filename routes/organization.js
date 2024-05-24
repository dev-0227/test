const express = require('express');
const controller = require('../controllers/settings/organization');
const AuthGuard = require('../middleware/auth');
const router = express.Router();

// Get all logs route 
router.get('/type/', AuthGuard, controller.list_type);
router.post('/type/add', AuthGuard, controller.add_type);
router.post('/type/chosen', AuthGuard, controller.chosen_type);
router.post('/type/update', AuthGuard, controller.update_type);
router.post('/type/delete', AuthGuard, controller.delete_type);

module.exports = router;
