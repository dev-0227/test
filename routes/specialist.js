const express = require('express');
const AuthGuard = require('../middleware/auth');
const controller = require('../controllers/settings/specialist');
const multer = require('multer');
const config = require('../config');
const utils = require('../utilities/utils');
const path = require('path');

const storage_csv = multer.diskStorage({
    destination: config.common.uploads,
    filename: (req, file, cb) => {
        cb(null, 'specialist-' + Date.now() + path.extname(file.originalname));
    }
});
const upload_csv = multer({
    storage: storage_csv
}).array('specialist_file');

const storage_photo = multer.diskStorage({
    destination: config.common.uploads + 'photoes/',
    filename: (req, file, cb) => {
        cb(null, generateRandomString(32) + path.extname(file.originalname));
    }
});
const upload_photo = multer({
    storage: storage_photo
}).fields([{
    name: 'ephoto',
    maxCount: 1
}])

const router = express.Router();

// Get all logs route 
router.get('/', AuthGuard, controller.list);
router.get('/listBymeasureID', AuthGuard, controller.listBymeasureID);
router.post('/add', AuthGuard, controller.add);
router.post('/update', AuthGuard, controller.update);
router.post('/chosen', AuthGuard, controller.chosen);
router.post('/delete', AuthGuard, controller.delete);
router.post('/updatepwd', AuthGuard, controller.updatepwd);
router.post('/updateanswer', AuthGuard, controller.updateanswer);
router.post('/updateclinic', AuthGuard, controller.updateclinic);
router.post('/updateClinics', AuthGuard, controller.updateClinics);
router.post('/getSpecialistByClinic', AuthGuard, controller.getSpecialistByClinic);
router.post('/updateorganizations', AuthGuard, controller.updateorganizations);
router.post('/getOrgan', AuthGuard, controller.getOrgan);
router.post('/getClinics', AuthGuard, controller.getClinics);
router.post('/getSpecialistByMeasureId', AuthGuard, controller.getSpecialistByMeasureId);
router.post('/getSpecialistByClinic', AuthGuard, controller.getSpecialistByClinic);
router.post('/import', AuthGuard, (req, res, next) => {
    upload_csv(req, res, (err) => {
        if (!err) {
            controller.import(req, res, next);
        }
    });
});
router.post('/uploadimage', AuthGuard, (req, res, next) => {
    upload_photo(req, res, (err) => {
        if (!err) {
            res.status(200).json({data: req.files});
        } else res.status(404).json(err);
    });
});

module.exports = router;
