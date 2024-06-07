const express = require('express');
const AuthGuard = require('../middleware/auth');
const controller = require('../controllers/settings/provider');
const multer = require('multer');
const config = require('../config');
const path = require('path');

const storage_csv = multer.diskStorage({
    destination: config.common.uploads,
    filename: (req, file, cb) => {
        cb(null, 'provider-' + Date.now() + path.extname(file.originalname));
    }
});
const upload_csv = multer({
    storage: storage_csv
}).array('provider_file');

const storage_photo = multer.diskStorage({
    destination: config.common.uploads + 'photoes/',
    filename: (req, file, cb) => {
        cb(null, generateRandomString(32) + path.extname(file.originalname));
    }
});
const upload_photo = multer({
    storage: storage_photo
}).array('ephoto');

const router = express.Router();

// Get all logs route 
router.get('/', AuthGuard, controller.list);
router.post('/add', AuthGuard, controller.add);
router.post('/update', AuthGuard, controller.update);
router.post('/chosen', AuthGuard, controller.chosen);
router.post('/delete', AuthGuard, controller.delete);
router.post('/updatepwd', AuthGuard, controller.updatepwd);
router.post('/updateanswer', AuthGuard, controller.updateanswer);
router.post('/updateclinic', AuthGuard, controller.updateclinic);
router.post('/getProviderByClinic', AuthGuard, controller.getProviderByClinic);
router.post('/getClinic', AuthGuard, controller.getClinic);
router.post('/setPCPInfo', AuthGuard, controller.setPCPInfo);
router.post('/getPCPInfo', AuthGuard, controller.getPCPInfo);
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
            res.status(200).json({data: req.files[0]});
        } else res.status(404).json(err);
    });
});

module.exports = router;
