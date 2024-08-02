
const express = require('express');
const multer = require('multer');
const path = require('path');
const config = require('../config');
const controller = require('../controllers/ptanalysisloader');
const AuthGuard = require('../middleware/auth');

const storage = multer.diskStorage({
    destination: config.common.uploads,
    filename: (req, file, cb) => {
        cb(null, 'ptanalysis-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).array('ptfile');

const router = express.Router();

router.post('/upload', (req, res, next) => {
    upload(req, res, (err) => {
        if (!err) {
            controller.ptanalysisloader(req, res, next);
        }
    });
});

router.post('/getTotal', AuthGuard, controller.getTotal)

module.exports = router
