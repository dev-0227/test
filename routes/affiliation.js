

const express = require('express')
const controller = require('../controllers/affiliation')
const AuthGuard = require('../middleware/auth')
const router = express.Router()

router.get('/', AuthGuard, controller.get)
router.post('/add', AuthGuard, controller.add)
router.post('/update', AuthGuard, controller.update)
router.post('/delete', AuthGuard, controller.delete)
router.post('/chosen', AuthGuard, controller.chosen)

module.exports = router
