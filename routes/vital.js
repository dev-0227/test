const express = require('express');
const controller = require('../controllers/settings/vital');
const multer = require('multer')
const path = require('path');
const router = express.Router();
const AuthGuard = require('../middleware/auth');
const config = require('../config');

// Get all logs route 
router.get('/', AuthGuard, controller.list);
router.post('/add', AuthGuard, controller.add);
router.post('/chosen', AuthGuard, controller.chosen);
router.post('/update', AuthGuard, controller.update);
router.post('/delete', AuthGuard, controller.delete);

router.post('/getpt', AuthGuard, controller.getpt);
router.post('/addpt', AuthGuard, controller.add);
router.post('/chosenpt', AuthGuard, controller.chosenpt);
router.post('/updatept', AuthGuard, controller.updatept);
router.post('/deletept', AuthGuard, controller.deletept);

const storage = multer.diskStorage({
    destination: config.common.uploads,
    filename: (req, file, cb) => {
        cb(null, 'vitallist-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).array('vitalfile');

router.post('/vitalloader', (req, res, next) => {
    upload(req, res, (err) => {
        if (!err) {
            controller.vitalloader(req, res, next);
        }
    });
});
router.post('/ecwbulk', AuthGuard, controller.ecwbulk);

module.exports = router;