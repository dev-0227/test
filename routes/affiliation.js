

const express = require('express')
const controller = require('../controllers/affiliation')
const AuthGuard = require('../middleware/auth')
const router = express.Router()

router.get('/', AuthGuard, controller.get)
router.post('/list', AuthGuard, controller.list)
router.post('/add', AuthGuard, controller.add)
router.post('/update', AuthGuard, controller.update)
router.post('/delete', AuthGuard, controller.delete)
router.post('/chosen', AuthGuard, controller.chosen)

router.get('/ins/', AuthGuard, controller.getInsClinicAffiliation)
router.post('/ins/add', AuthGuard, controller.addInsClinicAffiliation)
router.post('/ins/update', AuthGuard, controller.updateInsClinicAffiliation)
router.post('/ins/delete', AuthGuard, controller.deleteInsClinicAffiliation)
router.post('/ins/chosen', AuthGuard, controller.chosenInsClinicAffiliation)

module.exports = router
