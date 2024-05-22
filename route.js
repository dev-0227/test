const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

router.post('/test', controllers.test);
router.post('/login', controllers.login);

module.exports = router;
